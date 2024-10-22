from django.urls import path
from . import views
from knox import views as knox_views

urlpatterns = [
  path('api/register/', views.registerApi),
  path('api/login/', views.loginApi),
  path('api/profile/', views.profileApi),
  path('api/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
  path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
  path('api/books/', views.BooksList.as_view()),
  path('api/books/<int:pk>', views.details_book),
  path('api/books/<int:pk>/favorite', views.add_to_favorite),
  path('api/books/favorites', views.FavoriteList.as_view()),
  path('cart/<int:pk>/', views.CartListView.as_view()),
  path('cart/add/', views.CartAddBookView.as_view()),
  path('cart/update/<int:pk>/', views.CartUpdateBookQuantity.as_view()),
  path('cart/delete/<int:pk>/', views.CartDeleteBook.as_view()),
]
