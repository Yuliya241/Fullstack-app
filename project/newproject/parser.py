from bs4 import BeautifulSoup
import requests

res = requests.get('https://biblio.by/biblio-books.html')
soup = BeautifulSoup(res.text, 'lxml')

books = soup.find_all('div', class_='span13')
for book in books:
  author = book.find('p').text

  parentTitle = book.find('div', class_='product-name')
  title = parentTitle.find('a').text

  priceBox = book.find('div', class_='price-box')
  regularPriceParent = priceBox.find('span', class_='regular-price')
  if regularPriceParent is not None:
    regularPrice = regularPriceParent.find('span', class_='price').text
  else:
    regularPrice = ''

  oldPriceParent = priceBox.find('p', class_='old-price')
  if oldPriceParent:
    oldPrice = oldPriceParent.find('span', class_='price').text

  specialPriceParent = priceBox.find('p', class_='special-price')
  if specialPriceParent:
    specialPrice = specialPriceParent.find('span', class_='price').text

  imageParent = book.find('div', class_='images-container')
  image = imageParent.find('img')['src']
