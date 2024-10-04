from django.contrib import admin

from .models import Books

class BookAdmin(admin.ModelAdmin):
  list_display = ('image', 'title', 'author', 'oldprice', 'specialprice', 'regularprice')

admin.site.register(Books, BookAdmin)
