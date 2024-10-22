from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, filters, status, permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from .serializers import BookSerializer, FavoriteSerializer, UserSerializer
from .models import Books, FavoriteBooks
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
# from django.views.decorators.csrf import csrf_exempt, csrf_protect
# from .mixins import CartMixin
# from django.views.generic.list import ListView
# from rest_framework.views import APIView
# from .services import Cart
# from django.contrib.contenttypes.models import ContentType
# from rest_framework.decorators import action
# from rest_framework.permissions import IsAuthenticated

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
# @login_required
# @permission_classes([IsAuthenticated])
def add_to_favorite(request, pk):
        favorite_book, created = FavoriteBooks.objects.get_or_create(
            user=request.user.id, book_id=pk
        )
        # if request.user.is_authenticated:
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
        # return Response(
        #         {'message': 'ок'}
        #     )

class FavoriteList(generics.ListCreateAPIView):
  queryset = FavoriteBooks.objects.all()
  serializer_class = FavoriteSerializer
  # permission_classes = [permissions.IsAuthenticated]

# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.csrf import ensure_csrf_cookie
# # @csrf_exempt
# class CartAddView(CartMixin, View):
#     @ensure_csrf_cookie
#     def post(self, request):
#         product_id = request.POST.get("book_id")
#         product = Books.objects.get(id=product_id)

#         cart = self.get_cart(request, product=product)

#         if cart:
#             cart.quantity += 1
#             cart.save()
#         else:
#             Cart.objects.create(user=request.user if request.user.is_authenticated else None,
#                                 session_key=request.session.session_key if not request.user.is_authenticated else None,
#                                 product=product, quantity=1)
        
#         response_data = {
#             "message": "Товар добавлен в корзину",
#             'cart_items': request
#         }

#         return JsonResponse(response_data)


# class CartChangeView(CartMixin, View):
#     def post(self, request):
#         cart_id = request.POST.get("cart_id")
        
#         cart = self.get_cart(request, cart_id=cart_id)

#         cart.quantity = request.POST.get("quantity")
#         cart.save()

#         quantity = cart.quantity

#         response_data = {
#             "message": "Количество изменено",
#             "quantity": quantity,
#             'cart_items_html': self.render_cart(request)
#         }

#         return JsonResponse(response_data)


# class CartRemoveView(CartMixin, View):
#     def post(self, request):
#         cart_id = request.POST.get("cart_id")
        
#         cart = self.get_cart(request, cart_id=cart_id)
#         quantity = cart.quantity
#         cart.delete()

#         response_data = {
#             "message": "Товар удален из корзины",
#             "quantity_deleted": quantity,
#             'cart_items_html': self.render_cart(request)
#         }

#         return JsonResponse(response_data)

# from django.contrib.auth.decorators import login_required
# from django.contrib import messages

# # @login_required
# def add_to_cart(request, pk):
#     cart_item = Cart.objects.filter(user=request.user.id, book=pk).first()

#     if cart_item:
#         cart_item.quantity += 1
#         cart_item.save()
#         messages.success(request, "Item added to your cart.")
#     else:
#         Cart.objects.create(user=request.user.id, book=pk)
#         messages.success(request, "Item added to your cart.")

#     return Response(
#             {"data": list(cart_item), 
#             "cart_total_price": sum(Decimal(cart_item["regularprice"] or cart_item["specialprice"]) * cart_item["quantity"])
#             },
#             status=status.HTTP_200_OK
#             )

# class CartAPI(APIView):
#     """
#     Single API to handle cart operations
#     """
    # def __iter__(self):
    #     """
    #     Loop through cart items and fetch the products from the database
    #     """
    #     book_ids = self.cart.keys()
    #     books = Books.objects.filter(id__in=book_ids)
    #     cart = self.cart.copy()
    #     for book in books:
    #         cart[str(book.id)]["book"] = BookSerializer(book).data
    #     for item in cart.values():
    #         # item["oldprice"] = Decimal(item["oldprice"])
    #         item["specialprice"] = Decimal(item["specialprice"])
    #         item["regularprice"] = Decimal(item["regularprice"])
    #         if item["regularprice"]:
    #           item["total_price"] = item["regularprice"] * item["quantity"]
    #         else:
    #           item["total_price"] = item["specialprice"] * item["quantity"]
    #         yield item

    # def get(self, request, format=None):
    #     cart = Cart(request)

    #     return Response(
    #         {"data": list(cart.__iter__()), 
    #         "cart_total_price": cart.get_total_price()},
    #         status=status.HTTP_200_OK
    #         )
    
    # def post(self, request, **kwargs):
    #     cart = Cart(request)

    #     if "remove" in request.data:
    #         book = request.data['book']
    #         cart.remove(book)

    #     elif "clear" in request.data:
    #         cart.clear()

    #     else:
    #         book = request.data
    #         cart.add(
    #                 book=book['book'],
    #                 quantity=book["quantity"],
    #                 overide_quantity=book["overide_quantity"] if "overide_quantity" in book else False
    #             )
        
    #     return Response(
    #         {"message": "cart updated"},
    #         status=status.HTTP_202_ACCEPTED)

# 

# from django.contrib.auth.decorators import login_required
# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.utils.decorators import method_decorator


# @csrf_exempt
# @ensure_csrf_cookie
# @api_view(['POST'])
# @method_decorator(login_required)
# @csrf_exempt 
# from rest_framework.decorators import api_view, renderer_classes

# @api_view(('POST',))
# @renderer_classes((JSONRenderer,))
# from django.utils.decorators import method_decorator

# method_decorator(csrf_protect)
# @api_view(['POST'])


# @login_required(login_url='/accounts/login/')
# @login_required
# @api_view(['POST'])
