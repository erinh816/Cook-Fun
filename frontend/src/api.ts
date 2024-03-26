import { Recipe } from './types';

export const searchRecipes = async (searchTerm:string, page:number)=>{
  const baseUrl = new URL("http://localhost:5000/api/recipes/search");
  baseUrl.searchParams.append("searchTerm", searchTerm)
  baseUrl.searchParams.append("page", String(page))

  const response = await fetch(baseUrl)

  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

export const getRecipeSummary = async (recipeId:string)=>{
  const baseUrl = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);

  const response = await fetch(baseUrl);

  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

export const getFavoriteRecipes = async()=>{
  const baseUrl = new URL("http://localhost:5000/api/recipes/favorites");

  const response = await fetch(baseUrl);

  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json();
}


//add a recipe to fav
export const addFavoriteRecipe = async (recipe: Recipe) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/favorites");

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
