import csv
import psycopg2
from psycopg2 import Error
from psycopg2.extras import execute_values

class ImportToPostgres:
  @staticmethod
  def get_books():
    books = []
    with open('parsed.csv', newline='') as csvfile:
      reader = csv.DictReader(csvfile, delimiter=',')
      for row in reader:
        books.append(row['image'])
        books.append(row['title'])
        books.append(row['author'])

        oldPrice = [row['oldPrice'].strip().replace('\xa0руб', '').replace(',', '.')]
        for item in oldPrice:
          books.append(float(item))
        
        specialPrice = [row['specialPrice'].strip().replace('\xa0руб', '').replace(',', '.')]
        for item in specialPrice:
          books.append(float(item))

        regularPrice = [row['regularPrice'].strip().replace('\xa0руб', '').replace(',', '.')]
        for item in regularPrice:
          books.append(float(item) if item != '' else 0 )

    data = [tuple(books[i:i + 6]) for i in range(0, len(books), 6)]
    return data
  
  def get_connection(self):
    try:
      connection = psycopg2.connect(dbname="postgres",
                                    user="postgres",
                                    password="12345",
                                    host="localhost",
                                    port="5432")
      return connection
    except (Exception, Error) as error:
      print("Ошибка при работе с PostgreSQL", error)

  def create_books(self, connection):
    cursor = connection.cursor()
    cursor.execute(
            """
                CREATE TABLE IF NOT EXISTS popular_books
                (
                    id serial PRIMARY KEY,
                    image text, 
                    title text,
                    author text,
                    oldPrice real,
                    specialPrice real,
                    regularPrice real
                )
            """
        )
    connection.commit()

  def insert(self, connection, data):
    cursor = connection.cursor()
    execute_values(cursor, "INSERT INTO popular_books (image, title, author, oldPrice, specialPrice, regularPrice) VALUES %s", data)
    connection.commit()

  def save_to_postgres(self, data):
    connection = self.get_connection()
    self.create_books(connection)
    self.insert(connection, data)

  def run(self):
    books = self.get_books()
    # print(books)
    connection = self.get_connection()
    self.create_books(connection)
    self.insert(connection, books)
    self.save_to_postgres(books)
  
ImportToPostgres().run()