export interface Recipe {
  dish_name: string
  description: string
  duration: number
  ingredients: string[]
}

export interface Recipes {
  recipes: Recipe[]
}
