from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from .serializers import BookSerializer, UserSerializer
from .models import Books

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
