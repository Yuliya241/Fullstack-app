from django.conf import settings
settings.configure()

import django
django.setup()


from bs4 import BeautifulSoup
import requests
import csv
from models import Book
import time, random

def parser(url:str, max_item: int):
  create_csv()
  page = 1
  count_items = 0
  while max_item > count_items:
    list_books = []
    res = requests.get(f"{url}?p={page}")
    soup = BeautifulSoup(res.text, "lxml")
    books = soup.find_all('div', class_='span13')

    for book in books:
      if count_items >= max_item:
        break
      author = book.find('p').text

      parentTitle = book.find('div', class_='product-name')
      title = parentTitle.find('a').text

      priceBox = book.find('div', class_='price-box')
      regularPriceParent = priceBox.find('span', class_='regular-price')
      if regularPriceParent is not None:
        regularPrice = regularPriceParent.find('span', class_='price').text.strip()
      else:
        regularPrice = 0

      oldPriceParent = priceBox.find('p', class_='old-price')
      if oldPriceParent:
        oldPrice = oldPriceParent.find('span', class_='price').text.strip()
      else:
        oldPrice = 0

      specialPriceParent = priceBox.find('p', class_='special-price')
      if specialPriceParent:
        specialPrice = specialPriceParent.find('span', class_='price').text.strip()
      else:
        specialPrice = 0

      imageParent = book.find('div', class_='images-container')
      image = imageParent.find('img')['src']

      list_books.append(Book(
        image = image,
        title = title,
        author = author,
        oldPrice = oldPrice,
        specialPrice = specialPrice,
        regularPrice = regularPrice
        ))
    
    write_csv(list_books)
    time.sleep(random.choice([3, 5, 7]))
    page += 1


def create_csv():
  with open(f"parsed.csv", mode="w", newline="\n") as file:
    writer = csv.writer(file)
    writer.writerow([
      "image",
      "title",
      "author",
      "oldPrice",
      "specialPrice",
      "regularPrice"
    ])

def write_csv(books: list[Book]):
  with open(f"parsed.csv", mode="a", newline="\n") as file:
    writer = csv.writer(file)
    for book in books:
      writer.writerow([
        book.image,
        book.title,
        book.author,
        book.oldPrice,
        book.specialPrice,
        book.regularPrice
      ])

if __name__ == '__main__':
  parser(url="https://biblio.by/biblio-books.html", max_item=480)
