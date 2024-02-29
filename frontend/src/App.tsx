import {useState, FormEvent} from 'react';
import "./App.css";
import * as api from './api';
import {Recipe} from './types';


function App() {
  const [searchTerm, setSearchTerm] = useState("burgers");
  //the results from calling api is an array of a bunch of recipe objects, so we initialize the recipes as empty array
  const [recipes, setRecipes] = useState<Recipe[]>([])

 

  const handleSearchSubmit = async (evt:FormEvent)=>{
    evt.preventDefault();
    try{
      const recipes = await api.searchRecipes(searchTerm,1);
      setRecipes(recipes.results);
    }catch(error){
      console.log(error)
    }
  }



  return(
    <div>
      <form onSubmit={handleSearchSubmit}>
      <button type="submit">Submit</button>
      </form>
      <p>hello</p>
      {recipes.map((recipe)=>(
        <div>
          <p>{recipe.title}</p>
        </div>
      ))}
    </div>
  )
}

export default App
