import {useState, FormEvent, ChangeEvent} from 'react';
import "./App.css";
import * as api from './api';
import {Recipe} from './types';


function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  // function onChange(evt:ChangeEvent<HTMLInputElement>){
  //   setSearchTerm(evt.target.value)
  // }


  return(
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" 
               required
               placeholder = "Enter a search term ..."
               value = {searchTerm}
               onChange = {(event)=>setSearchTerm(event.target.value)}
              //  onChange = {onChange}
               >
        </input>
        <button type="submit">Submit</button>
      </form>
  
      {recipes.map((recipe)=>(
        <div>
          <p>{recipe.title}</p>
          <img src={recipe.image}/>
        </div>
      ))}
    </div>
  )
}

export default App
