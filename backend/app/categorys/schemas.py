from pydantic import BaseModel, Field, ConfigDict


class SCategory(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    category_name: str = Field(..., description="Название категории")
    count_products: int = Field(0, description="Количество товара данной категории")

class SCategorysAdd(BaseModel):
    category_name: str = Field(..., description="Название категории")
    count_products: int = Field(0, description="Количество товара, данной категории")


class SCategorysUpdDesc(BaseModel):
    category_name: str = Field(..., description="Название категории")