from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from .serializers import UserSerializer

@api_view(['POST'])
def login(request):
  serializer = AuthTokenSerializer(data=request.data)
  serializer.is_valid(raise_exception=True)
  user = serializer.validated_data['user']
  _, token = AuthToken.objects.create(user)

  return Response({
    'user': {
      'username': user.username,
      'email': user.email,
    },
    'token': token
  })

@api_view(['GET'])
def profile(request):
  user = request.user

  if user.is_authenticated:
    return Response({
      'user': {
        'username': user.username,
        'email': user.email,
    },
    })

  return Response({'error': 'user is not authenticated'}, status=400)

@api_view(['POST'])
def register(request):
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
