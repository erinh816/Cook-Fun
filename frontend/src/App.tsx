import {useState} from 'react';
import "./App.css";
import * as api from './api';

function App() {
  const [searchTerm, setSearchTerm] = useState("burgers");
  //the results from calling api is an array of a bunch of recipe objects, so we initialize the recipes as empty array
  const [recipes, setRecipes] = useState([])

  const handleSearchSubmit = async ()=>{
    try{
      const recipes = await api.searchRecipes(searchTerm,1);
      setRecipes(recipes);
    }catch(error){
      console.log(error)
    }
  }

  return(
    <div>
      {recipes.map((recipe)=>(
        <div>
          <p>{recipe.title}</p>
        </div>
      ))}
    </div>
  )
}

export default App
