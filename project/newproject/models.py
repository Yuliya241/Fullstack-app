from django.db import models
from django.contrib.auth.models import User
# from decimal import Decimal
# from django.conf import settings

class Books(models.Model):
    image = models.TextField()
    title = models.TextField()
    author = models.TextField()
    oldprice = models.FloatField()
    specialprice = models.FloatField()
    regularprice = models.FloatField()

    def __str__(self):
      return self.title

class Cart(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Пользователь')
    book = models.ForeignKey(to=Books, on_delete=models.CASCADE, verbose_name='Товар')
    quantity = models.PositiveSmallIntegerField(default=0, verbose_name='Количество')
    session_key = models.CharField(max_length=32, null=True, blank=True)

    class Meta:
        db_table = 'cart'
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"

    def __str__(self):
        if self.user:
            return f'Корзина {self.user.username} | Товар {self.book.title} | Количество {self.quantity}'
            
        return f'Анонимная корзина | Товар {self.book.title} | Количество {self.quantity}'

class FavoriteBooks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь', default=None, null=True)
    book = models.ForeignKey(Books, on_delete=models.CASCADE, verbose_name='Книга', blank=True, null=True)

    def __str__(self):
      return self.book.title
    
    class Meta:
        verbose_name = "Избранное"
        verbose_name_plural = "Избранные"
