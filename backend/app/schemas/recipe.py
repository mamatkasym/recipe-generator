from pydantic import BaseModel


class RecipeCreate(BaseModel):
    dish_name: str
    ingredients: list[str]
    description: str
    duration: str


class RecipeGenerate(BaseModel):
    ingredients: list[str]


class RecipeUpdate(RecipeCreate):
    pass


class Recipe(RecipeCreate):
    id: int

    class Config:
        orm_mode = True
