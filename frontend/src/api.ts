import { Recipe } from './types';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

export const searchRecipes = async (searchTerm:string, page:number)=>{
  const baseUrl = new URL(`${BASE_URL}/api/recipes/search`);
  baseUrl.searchParams.append("searchTerm", searchTerm)
  baseUrl.searchParams.append("page", String(page))

  const response = await fetch(baseUrl)

  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

export const getRecipeSummary = async (recipeId:string)=>{
  const baseUrl = new URL(`${BASE_URL}/api/recipes/${recipeId}/summary`);

  const response = await fetch(baseUrl);

  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

export const getFavoriteRecipes = async()=>{
  const baseUrl = new URL(`${BASE_URL}/api/recipes/favorites`);

  const response = await fetch(baseUrl);

  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json();
}


//add a recipe to fav
export const addFavoriteRecipe = async (recipe: Recipe) => {
  const baseUrl = new URL(`${BASE_URL}/api/recipes/favorites`);

  const body = {
    recipeId:recipe.id
  }

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      //what type of data to expect in the body
      "Content-Type":"application/json"
    },
    //need to convert body to string
    body:JSON.stringify(body)
  });

  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  //we don't need to return anything, no error means post good
}


//delete a recipe from fav
export const removeFavoriteRecipe = async (recipe: Recipe) => {
  const baseUrl = new URL(`${BASE_URL}/api/recipes/favorites`);

  const body = {
    recipeId:recipe.id
  }

  const response = await fetch(baseUrl, {
    method: "DELETE",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body)
  });

  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

}
