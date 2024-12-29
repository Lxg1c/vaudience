from sqlalchemy import text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base, str_uniq, int_pk


# создаем модель таблицы факультетов (majors)
class Category(Base):
    id: Mapped[int_pk]
    category_name: Mapped[str_uniq]
    count_products: Mapped[int] = mapped_column(server_default=text('0'))

    # Определяем отношения: один факультет может иметь много студентов
    products: Mapped[list["Product"]] = relationship("Product", back_populates="category")
    extend_existing = True

    def __str__(self):
        return f"{self.__class__.__name__}(id={self.id}, category_name={self.category_name!r})"

    def __repr__(self):
        return str(self)
