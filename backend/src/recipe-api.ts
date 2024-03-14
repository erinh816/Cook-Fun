
const apiKey = process.env.API_KEY;


export const searchRecipes = async (searchTerm:string, page:number) => {
  console.log("apiKey is",apiKey)
  if(!apiKey){
    throw new Error("API Key not found")
  }

  //step1: getting the end point
  const url = new URL("https://api.spoonacular.com/recipes/complexSearch")
  
  const queryParams = {
    apiKey: apiKey,
    query:searchTerm,
    number:'10',
    offset:(page*10).toString()
  }

  //search property starts with "?", search key word is a part of URLSearchParams
  url.search = new URLSearchParams(queryParams).toString()

  //step2: making the request
  try{
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  }catch(error){
    console.log(error)
  }
}

// export default searchRecipes;

//step3: call this function in get request in index.ts
  //import function there


export const getRecipeSummary = async (recipeId:string) => {
  if(!apiKey){
    throw new Error("API Key not found")
  }
  
  const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);

  const params = {
    apiKey:apiKey,
  }

  url.search = new URLSearchParams(params).toString();

  try{
    const searchResponse = await fetch(url);
    const resultsJson = await searchResponse.json();
    return resultsJson;
  }catch(error){
    console.log(error)
  }
  

}
