from typing import Any, List, Optional, Annotated

from fastapi import APIRouter, HTTPException, Body
from sqlalchemy import func, select
from starlette.responses import Response

from app.api.utils import openai_generate_recipes
from app.deps.db import CurrentAsyncSession
from app.deps.request_params import ItemRequestParams
from app.deps.users import CurrentUser
from app.models.recipe import Recipe
from app.schemas.recipe import Recipe as RecipeSchema
from app.schemas.recipe import RecipeCreate, RecipeGenerate, RecipeUpdate

router = APIRouter(prefix="/recipes")


# @router.get("generate", response_model=List[RecipeSchema])
@router.post("/generate")
def generate_recipes(
    item_in: RecipeGenerate
) -> Any:
    return openai_generate_recipes(item_in.ingredients)


@router.get("", response_model=List[RecipeSchema])
async def get_recipes(
    response: Response,
    session: CurrentAsyncSession,
    request_params: ItemRequestParams,
    user: CurrentUser,
) -> Any:
    total = await session.scalar(
        select(func.count(Recipe.id).filter(Recipe.user_id == user.id))
    )
    items = (
        (
            await session.execute(
                select(Recipe)
                .offset(request_params.skip)
                .limit(request_params.limit)
                .order_by(request_params.order_by)
                .filter(Recipe.user_id == user.id)
            )
        )
        .scalars()
        .all()
    )
    response.headers[
        "Content-Range"
    ] = f"{request_params.skip}-{request_params.skip + len(items)}/{total}"
    return items


@router.post("", response_model=RecipeSchema, status_code=201)
async def create_recipe(
    item_in: RecipeCreate,
    session: CurrentAsyncSession,
    user: CurrentUser,
) -> Any:
    item = Recipe(**item_in.dict())
    item.user_id = user.id
    session.add(item)
    await session.commit()
    return item


@router.put("/{item_id}", response_model=RecipeSchema)
async def update_recipe(
    item_id: int,
    item_in: RecipeUpdate,
    session: CurrentAsyncSession,
    user: CurrentUser,
) -> Any:
    item: Optional[Recipe] = await session.get(Recipe, item_id)
    if not item or item.user_id != user.id:
        raise HTTPException(404)
    update_data = item_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
    session.add(item)
    await session.commit()
    return item


@router.get("/{item_id}", response_model=RecipeSchema)
async def get_recipe(
    item_id: int,
    session: CurrentAsyncSession,
    user: CurrentUser,
) -> Any:
    item: Optional[Recipe] = await session.get(Recipe, item_id)
    if not item or item.user_id != user.id:
        raise HTTPException(404)
    return item


@router.delete("/{item_id}")
async def delete_recipe(
    item_id: int,
    session: CurrentAsyncSession,
    user: CurrentUser,
) -> Any:
    item: Optional[Recipe] = await session.get(Recipe, item_id)
    if not item or item.user_id != user.id:
        raise HTTPException(404)
    await session.delete(item)
    await session.commit()
    return {"success": True}
