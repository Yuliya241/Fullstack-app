from django.urls import path
from . import views
from knox import views as knox_views

urlpatterns = [
  path('register/', views.register),
  path('login/', views.login),
  path('profile/', views.profile),
  path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
  path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall')
]