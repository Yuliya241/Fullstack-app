from django.db import models
class Books(models.Model):
    image = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    oldPrice = models.FloatField()
    specialPrice = models.FloatField()
    regularPrice = models.FloatField()

    def __str__(self):
      return self.title
