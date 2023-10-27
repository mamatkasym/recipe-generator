import axios from 'axios'

const API_URL = 'http://0.0.0.0:8000/api/v1'
// const API_URL = 'http://127.0.0.1:8000/api/v1'
export async function generateRecipes(ingredients: string[]) {
  // return new Promise((resolve) =>
  //   resolve({
  //     data: [
  //       {
  //         dish_name: 'Omelet',
  //         duration: '15 minutes',
  //         ingredients: ['2 eggs', '1/4 cup milk'],
  //         description:
  //           'Heat a non-stick skillet over medium heat. In a bowl, whisk together the eggs and milk. Once the skillet is hot, add the egg mixture and let cook until eggs are almost set. Flip omelet over and cook for another 1-2 minutes until eggs are cooked to desired level. Serve warm.'
  //       },
  //       {
  //         dish_name: 'Scrambled Eggs',
  //         duration: '10 minutes',
  //         ingredients: ['4 eggs', '1/4 cup milk'],
  //         description:
  //           'Heat a non-stick skillet over medium heat. In a bowl, whisk together the eggs and milk. Once the skillet is hot, add the egg mixture and let cook until eggs start to form large curds. Stir the eggs while cooking until they are cooked to desired level. Serve warm.'
  //       },
  //       {
  //         dish_name: 'Egg Custard',
  //         duration: '30 minutes',
  //         ingredients: ['3 eggs', '1/2 cup milk'],
  //         description:
  //           'Preheat oven to 350°F. In a bowl, whisk together the eggs and milk. Pour the mixture into a greased baking dish. Place the dish in a larger pan filled with water. Bake for 25-30 minutes until custard is set. Serve warm.'
  //       },
  //       {
  //         dish_name: 'French Toast',
  //         duration: '20 minutes',
  //         ingredients: ['2 eggs', '1/4 cup milk'],
  //         description:
  //           'In a shallow bowl, whisk together the eggs and milk. Dip slices of bread into the egg mixture. Heat a non-stick skillet over medium heat. Once the skillet is hot, add the egg-dipped bread slices and cook until eggs are cooked and bread is golden brown. Serve warm.'
  //       },
  //       {
  //         dish_name: 'Egg Nog',
  //         duration: '15 minutes',
  //         ingredients: ['4 eggs', '2 cups milk'],
  //         description:
  //           'In a blender, add the eggs and milk. Blend until creamy. Pour the mixture into a saucepan and cook over medium heat for 10-15 minutes, stirring occasionally, until mixture is thickened. Serve cold.'
  //       }
  //     ]
  //   })
  // )
  return await axios.post(API_URL + '/recipes/generate', { ingredients })
}
