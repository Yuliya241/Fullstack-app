from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from .serializers import BookSerializer, UserSerializer
from newproject.models import Book
from rest_framework import generics
# from newproject.parser import title, image, author, oldPrice, specialPrice, regularPrice

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
    'token': token
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

class BookAPI(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    book = Book()

    # book.image = image
    # book.title = title
    # book.author = author
    # book.oldPrice = oldPrice
    # book.specialPrice = specialPrice
    # book.regularPrice = regularPrice

    # book.save()

