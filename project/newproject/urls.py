from django.urls import path
from . import views
from knox import views as knox_views

urlpatterns = [
  path('api/register/', views.registerApi),
  path('api/login/', views.loginApi),
  path('api/profile/', views.profileApi),
  path('api/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
  path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
  # path('api/books/', views.BookAPI.as_view()),
]
