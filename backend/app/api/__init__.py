from fastapi import APIRouter

from app.api import recipes, users, utils

api_router = APIRouter()

api_router.include_router(users.router, tags=["users"])
api_router.include_router(recipes.router, tags=["items"])
