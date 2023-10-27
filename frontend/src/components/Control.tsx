import React, { KeyboardEvent, SetStateAction, useState } from 'react'
import { generateRecipes } from '../api'
import { Recipe } from '../types'

interface ControlProps {
  ingredients: string[]
  loading: boolean
  setIngredients: React.Dispatch<SetStateAction<string[]>>
  setLoading: React.Dispatch<SetStateAction<boolean>>
  setRecipes: React.Dispatch<SetStateAction<Recipe[]>>
}

function Control({
  ingredients,
  setIngredients,
  setLoading,
  setRecipes
}: ControlProps) {
  const [currentIngredient, setCurrentIngredient] = useState('')

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((ing) => ing !== ingredient))
  }
  const addIngredient = (e: KeyboardEvent) => {
    if (e.key == 'Enter' && currentIngredient) {
      e.preventDefault()
      if (!ingredients.includes(currentIngredient)) {
        setIngredients([...ingredients, currentIngredient])
      }
      setCurrentIngredient('')
    }
  }

  const generate = () => {
    setLoading(true)
    generateRecipes(ingredients).then((r: any) => {
      console.log('Fetched data:', r.data)
      setRecipes(r.data)
      setLoading(false)
    })
  }

  return (
    // eslint-disable-next-line tailwindcss/no-contradicting-classname
    <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[776px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
      <input
        onKeyDown={(e: KeyboardEvent) => addIngredient(e)}
        value={currentIngredient}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCurrentIngredient(e.target.value)
        }
        type="text"
        id="default-input"
        placeholder="Type an ingredient and enter to add"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <div className="pt-5 space-x-2">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient}
            className="inline-flex items-center rounded-full bg-blue-200 px-3 py-1 text-xs font-bold text-blue-700"
          >
            {ingredient}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-4 h-3 w-3 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 sm:h-4 sm:w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => removeIngredient(ingredient)}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
      {ingredients.length ? (
        <div className="pt-10">
          <button
            onClickCapture={generate}
            className="border-b-blue-50000 rounded border bg-blue-300 px-6 py-1 font-bold text-gray-700 hover:bg-blue-200"
          >
            Generate
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default Control
