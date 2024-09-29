from django.db import models
from django.contrib.auth.models import AbstractUser

class Book(models.Model):
    image = str
    title = str
    author = str
    oldPrice = float
    specialPrice = float
    regularPrice = float

    def __str__(self):
      return self.username
