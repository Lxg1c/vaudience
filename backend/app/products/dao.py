from sqlalchemy import update, event, delete
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from app.dao.base import BaseDAO
from app.categorys.models import Category
from app.products.models import Product
from app.database import async_session_maker


@event.listens_for(Product, 'after_insert')
def receive_after_insert(mapper, connection, target):
    category_id = target.category_id
    connection.execute(
        update(Category)
        .where(Category.id == category_id)
        .values(count_products=Category.count_products + 1)
    )


@event.listens_for(Product, 'after_delete')
def receive_after_delete(mapper, connection, target):
    category_id = target.category_id
    connection.execute(
        update(Category)
        .where(Category.id == category_id)
        .values(count_products=Category.count_products - 1)
    )


class ProductDAO(BaseDAO):
    model = Product

    @classmethod
    async def find_products(cls, **product_data):
        async with async_session_maker() as session:
            # Создайте запрос с фильтрацией по параметрам product_data
            query = select(cls.model).options(joinedload(cls.model.category)).filter_by(**product_data)
            result = await session.execute(query)
            products_info = result.scalars().all()

            # Преобразуйте данные товара в словари с информацией о категории
            products_data = []
            for product in products_info:
                product_dict = product.to_dict()
                product_dict['category'] = product.category.category_name if product.category else None
                products_data.append(product_dict)

            return products_data

    @classmethod
    async def find_full_data(cls, product_id):
        async with async_session_maker() as session:
            # Query to get student info along with major info
            query = select(cls.model).options(joinedload(cls.model.category)).filter_by(id=product_id)
            result = await session.execute(query)
            product_info = result.scalar_one_or_none()

            # If product is not found, return None
            if not product_info:
                return None

            product_data = product_info.to_dict()
            product_data['category'] = product_info.category.category_name
            return product_data

    @classmethod
    async def add_product(cls, **product_data: dict):
        async with async_session_maker() as session:
            async with session.begin():
                new_product = cls.model(**product_data)
                session.add(new_product)
                await session.flush()
                new_product_id = new_product.id
                await session.commit()
                return new_product_id

    @classmethod
    async def delete_product_by_id(cls, product_id: int):
        async with async_session_maker() as session:
            async with session.begin():
                query = select(cls.model).filter_by(id=product_id)
                result = await session.execute(query)
                product_to_delete = result.scalar_one_or_none()

                if not product_to_delete:
                    return None

                # Delete the product
                await session.execute(
                    delete(cls.model).filter_by(id=product_id)
                )

                await session.commit()
                return product_id
