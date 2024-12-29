from datetime import datetime, date
from typing import Optional
import re
from pydantic import BaseModel, Field, field_validator, EmailStr, ConfigDict

class SProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_name: str = Field(..., description="Название товара")
    image_url: str = Field(..., description="Ссылка на фото")
    product_sizes: str = Field(..., description="Строка со всеми размерами")
    product_price: int = Field(0, description="Цена товара")
    product_description: str = Field(..., description="Описание товара")
    category: str = Field(..., description="Категория товара")

class SProductAdd(BaseModel):
    product_name: str = Field(..., max_length=100, description="Название товара")
    image_url: str = Field(..., description="Ссылка на фото")
    product_sizes: str = Field(..., max_length=30, description="Строка со всеми размерами")
    product_price: int = Field(0, description="Цена товара")
    product_description: str = Field(..., max_length=500, description="Описание товара")
    category_id: int = Field(..., description="Категория товара")
