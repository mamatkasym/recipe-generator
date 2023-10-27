import React, { SetStateAction } from 'react'
import { Recipe } from '../types'

interface props {
  recipes: Recipe[]
  setCurrentRecipe: React.Dispatch<SetStateAction<Recipe | null>>
  setShowModal: React.Dispatch<SetStateAction<boolean>>
}
function RecipeList({ recipes, setCurrentRecipe, setShowModal }: props) {
  return (
    <div className="flex flex-col justify-center items-center pt-4 pb-4">
      <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
          <div className="text-lg font-bold text-navy-700 dark:text-white">
            Recipes
          </div>
          <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
            Time to ready
          </button>
        </div>
        {recipes.map((recipe, index) => (
          <div
            onClickCapture={() => {
              setCurrentRecipe(recipe)
              setShowModal(true)
            }}
            key={index}
            className="flex cursor-pointer h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] hover:bg-blue-100 dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center">
                <img className="h-full w-full rounded-xl" src="1.jpg" alt="" />
              </div>
              <div className="flex flex-col">
                <h5 className="text-base font-bold text-navy-700 dark:text-white">
                  {recipe.dish_name}
                </h5>
                <p className="mt-1 text-sm font-normal text-gray-600">
                  {(recipe.ingredients || []).slice(0, 2).join(', ') + '...'}
                </p>
              </div>
            </div>
            <div className="text-navy-700 mt-1 flex items-center justify-center dark:text-white">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-clock"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
              </div>
              <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                <p>{recipe.duration}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecipeList
