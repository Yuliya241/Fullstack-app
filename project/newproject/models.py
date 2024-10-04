from django.db import models
class Books(models.Model):
    image = models.TextField()
    title = models.TextField()
    author = models.TextField()
    oldprice = models.FloatField()
    specialprice = models.FloatField()
    regularprice = models.FloatField()

    def __str__(self):
      return self.title
