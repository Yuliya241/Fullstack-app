from django.contrib import admin

from .models import Books

class BookAdmin(admin.ModelAdmin):
  list_display = ('image', 'title', 'author', 'oldPrice', 'specialPrice', 'regularPrice')

admin.site.register(Books, BookAdmin)
