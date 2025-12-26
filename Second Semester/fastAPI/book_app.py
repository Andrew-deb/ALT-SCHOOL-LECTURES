from fastapi import FastAPI

app = FastAPI()

books= {
  0: {
    "id": 1,
    "title": "Harry Potter",
    "year": 1994,
    "author": "Myles"
  },
  1 : {
    "id": 2,
    "title": "Why is Not",
    "year": 2017,
    "author": "Judea"
  },
  2: {
    "id": 3,
    "title": "Mindset",
    "year": 2012,
    "author": "Joyce"
  }}
book_data = {"id": "0", "title": "", "year": 0, "author": ""}


@app.get("/")
def get_book():
    return {"message": "Welcome to the Book App!"}

@app.get("/books")
def get_books():
    return books

@app.get("/books/{book_id}")
def get_book_by_id(book_id: int):
    book = books.get(book_id)
    if not book:
        return {"error": "Book not found"}
    return book

@app.post("/books")
def create_book(id: int, title: str, year: int, author:str):
    new_book = book_data.copy()
    new_book["id"] = int(len(books) + 1)
    new_book["title"] = title
    new_book["year"] = year
    new_book["author"] = author

    books[new_book["id"]] = new_book
    return {"message": "Book added successfully", "data": new_book}

@app.put("/books/{book_id}")
def update_book(id: int, title: str = None, year: int = None, author: str =None):
    book = books.get(id)

    if not book:
        return {"error": "Book not found"}
    if title:
        book["title"] = title
    if year:
        book["year"] = year
    if author:
        book["author"] = author

    return {"message": "Book updated successfully", "data": book}

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    book = books.get(book_id)
    if not book:
        return {"error": "Book not found"}
    del books[book_id]
    return {"message": "Book deleted successfully"}
