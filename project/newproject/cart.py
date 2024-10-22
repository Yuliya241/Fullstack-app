# from decimal import Decimal

# from django.conf import settings

# from .serializers import BookSerializer
# from .models import Books


# class Cart:
#     def __init__(self, request):
#         """
#         initialize the cart
#         """
#         self.session = request.session
#         cart = self.session.get(settings.CART_SESSION_ID)
#         if not cart:
#             # save an empty cart in session
#             cart = self.session[settings.CART_SESSION_ID] = {}
#         self.cart = cart

#     def save(self):
#         self.session.modified = True

#     def add(self, book, quantity=1, overide_quantity=False):
#         """
#         Add product to the cart or update its quantity
#         """
        
#         book_id = str(book["id"])
#         if book_id not in self.cart:
#             self.cart[book_id] = {
#                 "quantity": 0,
#                 # "oldprice": str(product["oldprice"]),
#                 "specialprice": str(book["specialprice"]),
#                 "regularprice": str(book["regularprice"])
#             }
#         if overide_quantity:
#             self.cart[book_id]["quantity"] = quantity
#         else:
#             self.cart[book_id]["quantity"] += quantity
#         self.save()

#     def remove(self, book):
#         """
#         Remove a product from the cart
#         """
#         book_id = str(book["id"])

#         if book_id in self.cart:
#             del self.cart[book_id]
#             self.save()
    
#     def __iter__(self):
#         """
#         Loop through cart items and fetch the products from the database
#         """
#         book_ids = self.cart.keys()
#         books = Books.objects.filter(id__in=book_ids)
#         cart = self.cart.copy()
#         for book in books:
#             cart[str(book.id)]["book"] = BookSerializer(book).data
#         for item in cart.values():
#             # item["oldprice"] = Decimal(item["oldprice"])
#             item["specialprice"] = Decimal(item["specialprice"])
#             item["regularprice"] = Decimal(item["regularprice"])
#             if item["regularprice"]:
#               item["total_price"] = item["regularprice"] * item["quantity"]
#             else:
#               item["total_price"] = item["specialprice"] * item["quantity"]
#             yield item
    
#     def __len__(self):
#         """
#         Count all items in the cart
#         """
#         return sum(item["quantity"] for item in self.cart.values())
    
#     def get_total_price(self):
#         return sum(Decimal(item["regularprice"] or item["specialprice"]) * item["quantity"] for item in self.cart.values())
    
#     def clear(self):
#         # remove cart from session
#         del self.session[settings.CART_SESSION_ID]
#         self.save()