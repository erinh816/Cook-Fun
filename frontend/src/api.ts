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
