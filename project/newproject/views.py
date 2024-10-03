from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.models import AuthToken
from .serializers import BookSerializer, UserSerializer
from .models import Books
from django.http.response import JsonResponse

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

def book_list(request):
    books = Books.objects.all()
        
    if request.method == 'GET': 
        books_serializer = BookSerializer(books, many=True)

        return Response(books_serializer.data)

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

@api_view(['GET'])
def book_list(request):
  if request.method == 'GET':
    books = Books.objects.all()
    books_serializer = BookSerializer(books, many=True)
    return JsonResponse(books_serializer.data, safe=False)


