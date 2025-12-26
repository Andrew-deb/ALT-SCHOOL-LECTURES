from fastAPI import FastAPI

app = FastAPI()

books= {}
book_data = {
    {"id": "0", "title": "", "year": 0, "author": ""}
}

@app.get("/")
def get_book():
    return {"message": "Welcome to the Book App!"}

@app.get("/books")
def get_books():
    return books

app.get("/books/{book_id}")
