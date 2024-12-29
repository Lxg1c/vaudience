from sqlalchemy.future import select
from app.dao.base import BaseDAO
from app.categorys.models import Category
from app.database import async_session_maker


class CategorysDAO(BaseDAO):
    model = Category

    @classmethod
    async def find_categories(cls):
        async with async_session_maker() as session:
            query = select(cls.model)
            result = await session.execute(query)
            categories_info = result.scalars().all()

        return categories_info