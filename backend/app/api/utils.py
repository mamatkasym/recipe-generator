import ast

import openai as openai


def create_dish_prompt(ingredients: list[str]):
    prompt = f"create up to 5 detailed recipes with only the following ingredients: {','.join(ingredients)}. \n" \
             + f"Return list of dictionaries with keys 'dish_name', 'duration', 'ingredients', 'description' with " \
               f"corresponding values"
    return prompt


def openai_generate_recipes(ingredients: list[str]):
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=create_dish_prompt(ingredients),
        max_tokens=4000,
        temperature=0.7,
        api_key='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'
    )

    response = response['choices'][0]['text']
    try:
        return ast.literal_eval(response)
    except Exception as e:
        print(e)
        return []
