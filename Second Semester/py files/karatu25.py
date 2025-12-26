# e-commerce
# create product
# fetch product
# update product (partial and complete)
# delete product

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from typing import Optional

app = FastAPI()

# In-memory store for products
products = {}


class ProductBase(BaseModel):
    name: str = Field(..., example="Laptop")
    description: str
    price: float
    stock: int


class Product(ProductBase):
    id: int


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None


class ProductCreate(ProductBase):
    pass


'''
products = {
    1: {
        "id": 1,
        "name": "Laptop",
        "description": "A high-performance laptop",
        "price": 1200.00,
        "stock": 10
    },
    2: {
        "id": 2,
        "name": "Smartphone",
        "description": "A latest model smartphone",
        "price": 800.00,
        "stock": 25
    }
} dictionary.values()
'''


@app.post("/products/", status_code=201)
def create_product(product_data: ProductCreate):
    product_id = len(products) + 1
    product_data = {
        "id": product_id,
        "name": product_data.name,
        "description": product_data.description,
        "price": product_data.price,
        "stock": product_data.stock
    }
    products[product_id] = product_data
    return product_data


@app.get("/products/{product_id}")
def get_product(product_id: int):
    product = products.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.get('/products/')
def list_products(stock: Optional[int] = None):
    if stock is not None:
        return [product for product in products.values() if product["stock"] == stock]
    # if stock is not None:
    #  filtered_products = []
    #   for product in products.values():
    #       if product["stock"] == stock:
    #           filtered_products.append(product)
    #   return filtered_products
    return list(products.values())


@app.put("/products/{product_id}")
def update_product(product_id: int, product_data: ProductUpdate):
    if product_id not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    products[product_id] = {
        "id": product_id,
        "name": product_data.name,
        "description": product_data.description,
        "price": product_data.price,
        "stock": product_data.stock
    }
    return products[product_id]


@app.patch("/products/{product_id}")
def partial_update_product(product_id: int, product_data: ProductUpdate):
    product = products.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product_data.name is not None:
        product["name"] = product_data.name
    if product_data.description is not None:
        product["description"] = product_data.description
    if product_data.price is not None:
        product["price"] = product_data.price
    if product_data.stock is not None:
        product["stock"] = product_data.stock

    return product


@app.delete("/products/{product_id}", status_code=200)
def delete_product(product_id: int):
    if product_id not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    del products[product_id]
    return {"message": "Product deleted successfully"}
