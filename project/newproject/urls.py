from django.urls import path
from . import views
from knox import views as knox_views
# from django.contrib.auth.decorators import login_required

urlpatterns = [
  path('api/register/', views.registerApi),
  path('api/login/', views.loginApi),
  path('api/profile/', views.profileApi),
  path('api/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
  path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
  path('api/books/', views.BooksList.as_view()),
  path('api/books/<int:pk>', views.details_book),
  path('api/books/<int:pk>/favorite', views.add_to_favorite),
  path('api/books/favorites', views.FavoriteList.as_view())
  # path('cart_add/', views.CartAddView.as_view(), name='cart_add'),
  # path('cart_change/', views.CartChangeView.as_view(), name='cart_change'),
  # path('cart_remove/', views.CartRemoveView.as_view(), name='cart_remove'),
  # path("add/<int:pk>/", views.add_to_cart, name="add_to_cart"),
  # path("remove/<int:cart_item_id>/", views.remove_from_cart, name="remove_from_cart"),
  # path("", views.cart_detail, name="cart_detail"),
  # path('cart/', views.CartAPI.as_view()),
]
