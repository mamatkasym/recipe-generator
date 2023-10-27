import React, { useState } from 'react'
import { Recipe } from '../types'
import Loader from './Avatar/Loader'
import Control from './Control'
import RecipeList from './RecipeList'
import RecipeModal from './RecipeModal'

function Main() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Control
        ingredients={ingredients}
        loading={loading}
        setIngredients={setIngredients}
        setLoading={setLoading}
        setRecipes={setRecipes}
      />
      <div className="flex flex-col justify-center items-center pt-7">
        {loading ? (
          <Loader />
        ) : recipes.length ? (
          <RecipeList
            recipes={recipes}
            setCurrentRecipe={setCurrentRecipe}
            setShowModal={setShowModal}
          />
        ) : null}
      </div>
      <RecipeModal
        recipe={currentRecipe}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  )
}

export default Main
