from fastapi import APIRouter, Depends
from app.products.dao import ProductDAO
from app.products.rb import RBProduct
from app.products.schemas import SProduct, SProductAdd
from fastapi.middleware.cors import CORSMiddleware

router = APIRouter(prefix='/products', tags=['work_with_products'])

@router.get("/", summary="Получить весь товар")
async def get_all_products(request_body: RBProduct = Depends()) -> list[SProduct]:
    return await ProductDAO.find_products(**request_body.to_dict())


@router.get("/{product_id}", summary="Получить один товар по id")
async def get_product_by_id(product_id: int) -> SProduct | dict:
    rez = await ProductDAO.find_full_data(product_id=product_id)
    if rez is None:
        return {'message': f'Товар с ID {product_id} не найден!'}
    return rez


@router.get("/by_filter", summary="Получить один товар по фильтру")
async def get_product_by_filter(request_body: RBProduct = Depends()) -> SProduct | dict:
    rez = await ProductDAO.find_one_or_none(**request_body.to_dict())
    if rez is None:
        return {'message': f'Товар с указанными вами параметрами не найден!'}
    return rez


@router.post("/add/")
async def add_product(product: SProductAdd = Depends()) -> dict:
    check = await ProductDAO.add_product(**product.dict())
    if check:
        return {"message": "Товар успешно добавлен!", "product": product}
    else:
        return {"message": "Ошибка при добавлении товара!"}


@router.delete("/dell/{product_id}")
async def dell_product_by_id(product_id: int) -> dict:
    check = await ProductDAO.delete_product_by_id(product_id=product_id)
    if check:
        return {"message": f"Товар с ID {product_id} удален!"}
    else:
        return {"message": "Ошибка при удалении товара!"}
