# ALT SCHOOL LECTURES - SECOND SEMESTER NOTES

## Lecture Tips

### Data Structures Overview
- **Ordered List**: Elements can be accessed through indexes (e.g., list, tuples, etc.).
- **Unordered List**: Elements can only be accessed through keys (e.g., dictionary, sets, etc.).
- **Iterable**: A collection you can iterate over (e.g., string, list, tuples, dictionaries, etc.).
- **Generator**: 
  - A special type of iterable that generates values on the fly without storing them in memory.
  - Defined using functions and the `yield` statement.

### `zip` Function
The `zip()` function takes iterables (can be zero or more), aggregates them in a tuple, and returns it. It combines multiple iterables (like lists, tuples, strings) element by element.

Example:
```python
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
res = dict()
for num, char in zip(list1, list2):
    res[num] = char  # Creating a dictionary from two lists
print(res)  # Output: {1: 'a', 2: 'b', 3: 'c'}
```

### Yield vs Return
- **`return`**:
  - Exits a function and returns a value to the caller.
  - Terminates the function upon execution.
- **`yield`**:
  - Makes a function a generator.
  - Saves the function's state and sends a value back to the caller, allowing execution to continue from where it left off.

### Comprehensions
A concise way to create lists, sets, or dictionaries in a single line of code.

**Example of a list comprehension:**
```python
squares = [x**2 for x in range(10) if x % 2 == 0]
```

---

## Object-Oriented Programming (OOP) Concepts

### Definition of Key OOP Terms
- **Class**: A blueprint for creating objects.
- **Object**: An instance of a class.
- **Inheritance**: Enables a new class to inherit attributes and methods from an existing class.
- **Encapsulation**: Bundles data and methods in one unit (e.g., a class).
    - **Private**: Accessible only within the class itself.
    - **Public**: Accessible both inside and outside the class.
    - **Protected**: Accessible within the class and its subclasses.
- **Polymorphism**: The ability to present the same interface for different data types or objects.
- **Abstraction**: Hiding complex implementation details while exposing essential features.
- **Method Overriding**: A subclass provides a specific implementation of a method from its superclass.
- **Method Overloading**: Simulating the presence of multiple methods with the same name but different parameters.
- **Constructor**: A special method (e.g., `__init__`) called during object instantiation.
- **Destructor**: A special method (e.g., `__del__`) triggered when an object is about to be destroyed.
- **`self`**: Refers to the current instance of the class.

### Variables and Methods in Classes
- **Class Variable**: Shared among all instances of the class.
- **Instance Variable**: Unique to each instance of the class.
- **Static Method**: Does not depend on class instances; it is defined with the `@staticmethod` decorator.
- **Class Method**: Operates on the class rather than an instance; defined with the `@classmethod` decorator.
- **Abstract Class**: Cannot be instantiated and must be subclassed.

---

## FastAPI Basics

### FastAPI Initialization
Code:
```python
from fastapi import FastAPI
app = FastAPI()  # Creates the FastAPI instance to register routes (endpoints).
```

### Pydantic Models
Used for data validation and serialization. Starlette is used for speed and performance (hence allowing `async` with FastAPI).

### API Client and Response Wrapping
#### Key Definitions
- **Client**: The consumer of your API; its code relies on the API's response format.
- **Client's Code**: Implementation handling responses from your API.
- **Collection Wrapper**: Wraps a list of objects inside another object for future-proofing.
- **Response Wrapper**: A standardized envelope for API responses.

#### Response Wrapper Example
```python
from pydantic import BaseModel
from typing import Optional

class Response(BaseModel):
    message: Optional[str] = None
    has_error: bool = False
    error_message: Optional[str] = None
    data: Optional[Book | Books] = None
```

#### Field Explanation
- **message**: Friendly note like "Book created successfully."
- **has_error**: Boolean flag indicating if something went wrong.
    - **error_message**: Explains the error if `has_error == True`.
- **data**: Actual payload:
    - A single `Book` (e.g., when fetching one book).
    - A `Books` collection (e.g., when listing books).

### Code Explanation
#### Adding a Book
```python
from uuid import UUID

@app.post("/books")
def add_book(book_in: BookCreate):
    book = Book(
        id=str(UUID(int=len(books) + 1)),  # Simulated UUID derivation
        **book_in.dict(),  # Unpacking dictionary fields into keyword arguments
    )
```

#### Proper UUID Generation
```python
from uuid import uuid4
from pydantic import BaseModel

class Book(BaseModel): 
    id: str 
    title: str 
    author: str 

def add_book(book_in: dict): 
    book = Book( 
        id=str(uuid4()),  # ✅ Proper UUID generation
        **book_in  # Unpack dictionary fields
    ) 
    return book 

# Example usage 
book_in = {"title": "Dune", "author": "Frank Herbert"} 
new_book = add_book(book_in) 
print(new_book)
```

#### Explanation of UUID:
- **`uuid4()`**: Generates a random UUID.
- Example UUID: `c9b1f2e2-3f4a-4f7d-9c3a-2d9a6f8b7e1a`
- **`str(uuid4())`**: Converts the UUID object into a string for storage.

---