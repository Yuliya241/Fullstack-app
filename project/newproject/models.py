from django.db import models
from django.contrib.auth.models import User

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
    book_id = models.ForeignKey(to=Books, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Книга')
    image = models.TextField(blank=True, null=True)
    title = models.TextField(blank=True, null=True)
    author = models.TextField(blank=True, null=True)
    oldprice = models.FloatField(blank=True, null=True)
    specialprice = models.FloatField(blank=True, null=True)
    regularprice = models.FloatField(blank=True, null=True)
    quantity = models.PositiveSmallIntegerField(default=0, verbose_name='Количество')

    class Meta:
        db_table = 'cart'
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"

    def __str__(self):
        if self.user:
            return f'Корзина {self.user.username} | Товар {self.title} | Количество {self.quantity}'
            
        return f'Анонимная корзина | Товар {self.title} | Количество {self.quantity}'

class FavoriteBooks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь', default=None, null=True)
    book = models.ForeignKey(Books, on_delete=models.CASCADE, verbose_name='Книга', blank=True, null=True)

    def __str__(self):
      return self.book.title
    
    class Meta:
        verbose_name = "Избранное"
        verbose_name_plural = "Избранные"
