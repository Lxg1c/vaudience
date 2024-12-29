from fastapi import FastAPI
from app.students.router import router as router_students
from app.majors.router import router as router_majors
from app.users.router import router as router_users
from app.categorys.router import router as router_categorys
from app.products.router import router as router_products
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
app = FastAPI()

origins = [
     "http://localhost:5173",
     "http://127.0.0.1:5173"
]

app.add_middleware(
     CORSMiddleware,
     allow_origins=["*"],
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"],
)

app.include_router(router_users)
app.include_router(router_categorys)
app.include_router(router_products)

if __name__ == "__main__":
     uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
