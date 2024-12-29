from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base, int_pk

# Создаем модель таблицы товара
class Product(Base):
    id: Mapped[int_pk]
    product_name: Mapped[str]
    image_url: Mapped[str]
    product_sizes: Mapped[str]
    product_price: Mapped[int]
    product_description: Mapped[str]
    category_id: Mapped[int] = mapped_column(ForeignKey('categorys.id'), nullable=False)

    # Определяем отношение: одна категория имеет много товара
    category: Mapped["Category"] = relationship("Category", back_populates="products")
    extend_existing = True

    def __str__(self):
        return (f"{self.__class__.__name__}(id={self.id}),"
                f"product_name={self.product_name},"
                f"product_description={self.product_description},"
                f"product_price={self.product_price},")

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "image_url": self.image_url,
            "product_sizes": self.product_sizes,
            "product_price": self.product_price,
            "product_description": self.product_description,
            "category_id": self.category_id,
        }