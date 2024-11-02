from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, filters, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from .serializers import BookSerializer, FavoriteSerializer, UserSerializer, CartSerializer
from .models import Books, FavoriteBooks, Cart
from rest_framework.views import APIView

@api_view(['POST'])
def loginApi(request):
  serializer = AuthTokenSerializer(data=request.data)
  serializer.is_valid(raise_exception=True)
  user = serializer.validated_data['user']
  _, token = AuthToken.objects.create(user)

  return Response({
    'user': {
      'username': user.username,
      'email': user.email,
      'id': user.id,
    },
    'token': token,
  })

@api_view(['GET'])
def profileApi(request):
  user = request.user

  if user.is_authenticated:
    return Response({
      'user': {
        'username': user.username,
        'email': user.email,
        'id': user.id,
    },
    })

  return Response({'error': 'user is not authenticated'}, status=400)

@api_view(['POST'])
def registerApi(request):
  serializer = UserSerializer(data=request.data)
  serializer.is_valid(raise_exception=True)

  user = serializer.save()
  _, token = AuthToken.objects.create(user)

  return Response({
    'user': {
      'username': user.username,
      'email': user.email,
    },
    'token': token
  })

class BooksList(generics.ListCreateAPIView):
  queryset = Books.objects.all()
  serializer_class = BookSerializer
  filter_backends = [filters.SearchFilter]
  search_fields = ['title']

  def post(self, request, *args, **kwargs):
    serializer = self.serializer_class(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(
      serializer.data,
      status=status.HTTP_201_CREATED
    )

@api_view(['GET'])
def details_book(request, pk):
  if request.method == 'GET':
    book = Books.objects.get(pk=pk)
    serializer = BookSerializer(book)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_favorite(request, pk):
  favorite_book, created = FavoriteBooks.objects.get_or_create(
    user=request.user.id, book_id=pk
  )
  if created:
    return Response(
      {'message': 'Книга добавлена в избранное'},
      status=status.HTTP_201_CREATED
  )
  else:
    favorite_book.delete()
    return Response(
      {'message': 'Книга удалена из избранного'},
      status=status.HTTP_200_OK
  )

class FavoriteList(generics.ListCreateAPIView):
  queryset = FavoriteBooks.objects.all()
  serializer_class = FavoriteSerializer

class CartListView(APIView):

  def get(self, request, pk):
    data = Cart.objects.filter(user=pk)
    serializer = CartSerializer(data, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class CartAddBookView(APIView):

  def post(self, request):
    data = request.data
    filter_user = Cart.objects.filter(user=data["user"])

    try:
      cart_book = filter_user.get(book_id=data["book_id"])
      cart_book.quantity += 1
      cart_book.save()

      serializer = CartSerializer(cart_book, many=False)
      return Response(serializer.data, status=status.HTTP_200_OK)
    except:
      add_in_cart = {
        "book_id": data["book_id"],
        "image": data["image"],
        "title": data["title"],
        "author": data["author"],
        "oldprice": data["oldprice"],
        "specialprice": data["specialprice"],
        "regularprice": data["regularprice"],
        "quantity": 1,
        "user": data["user"]
      }

      serializer = CartSerializer(data=add_in_cart, many=False)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
      else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CartUpdateBookQuantity(APIView):

  def put(self, request, pk):
    data = request.data
    cart_book = Cart.objects.get(book_id=pk)
    cart_book.quantity = data["quantity"]
    cart_book.save()
    return Response({"message": "Book quantity was updated successfully"}, status=status.HTTP_200_OK)

class CartDeleteBook(APIView):

  def delete(self, request, pk):
    cart_book = Cart.objects.get(book_id=pk)
    cart_book.delete()
    return Response({"message": "Book was deleted successfully"}, status=status.HTTP_200_OK)
