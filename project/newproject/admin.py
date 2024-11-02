from django.contrib import admin

from .models import Books, Cart, FavoriteBooks

class BookAdmin(admin.ModelAdmin):
  list_display = ('image', 'title', 'author', 'oldprice', 'specialprice', 'regularprice')
  search_fields = ('title', 'author')
  list_filter = ('title', 'author', 'specialprice')

class CartAdmin(admin.ModelAdmin):
  list_display = [f.name for f in Cart._meta.get_fields()]

class FavoriteAdmin(admin.ModelAdmin):
  list_display = [f.name for f in FavoriteBooks._meta.get_fields()]

admin.site.register(Books, BookAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(FavoriteBooks, FavoriteAdmin)
