from django.contrib.auth.models import User
from rest_framework import serializers, validators
from django.contrib.auth.hashers import make_password
from .models import Books

class UserSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[validators.UniqueValidator(
      User.objects.all(), "A user with such email already exists"
    )]
  )
  username = serializers.CharField(max_length=32,required=True)
  password = serializers.CharField(min_length=8)
  confirm_password = serializers.CharField(min_length=8)

  class Meta:
      model = User
      fields = ('username', 'email', 'password', 'confirm_password')

  def create(self, validated_data):
      user = User.objects.create(
        username = validated_data.get('username'),
        email = validated_data.get('email'),
        password = make_password(validated_data.get('password')),
      )

      return user

  def validate(self, attrs):
    if attrs.get('password') != attrs.get('confirm_password'):
      raise serializers.ValidationError("Passwords don't match.")
    return attrs

class BookSerializer(serializers.ModelSerializer):
  id = serializers.IntegerField(read_only=True)
  class Meta:
    model = Books
    fields = ['id', 'image', 'title', 'author', 'oldprice', 'specialprice', 'regularprice']
