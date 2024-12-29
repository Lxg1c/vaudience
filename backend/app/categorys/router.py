from fastapi import APIRouter
from fastapi.params import Depends

from app.categorys.dao import CategorysDAO
from app.categorys.schemas import SCategorysAdd, SCategorysUpdDesc, SCategory

router = APIRouter(prefix='/categorys', tags=['Work with categories'])

@router.get('/', summary="Получить все категории")
async def get_all_categories() -> list[SCategory]:
    return await CategorysDAO.find_categories()

@router.post("/add/")
async def add_category(category: SCategorysAdd = Depends()) -> dict:
    check = await CategorysDAO.add(**category.dict())
    if check:
        return {"message": "Категория успешно добавлена!", "category": category}
    else:
        return {"message": "Ошибка при добавлении факультета!"}


@router.put("/update_description/")
async def update_category(category: SCategorysUpdDesc) -> dict:
    check = await CategorysDAO.update(filter_by={'category_name': category.category_name})

    if check:
        return {"message": "Категория успешно обновлена!", "category": category}
    else:
        return {"message": "Ошибка при обновлении категории!"}


@router.delete("/delete/{category_id}")
async def delete_category(category_id: int) -> dict:
    check = await CategorysDAO.delete(id=category_id)
    if check:
        return {"message": f"Категория с ID {category_id} удалена!"}
    else:
        return {"message": "Ошибка при удалении категории!"}
