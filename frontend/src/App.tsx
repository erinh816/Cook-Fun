import {useState, useRef, useEffect, FormEvent, ChangeEvent} from 'react';
import "./App.css";
import * as api from './api';
import {Recipe} from './types';
import RecipeCard from './components/RecipeCard';


function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  //the results from calling api is an array of a bunch of recipe objects, so we initialize the recipes as empty array
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const pageNumber = useRef(1);

 

  /* for seperate of concerns, the fetch functionality */ 
  const handleSearchSubmit = async (evt:FormEvent)=>{
    evt.preventDefault();
    try{
      // const recipes = await api.searchRecipes(searchTerm,1);
      const response = await api.searchRecipes(searchTerm, 1);
      // setRecipes(recipes.results);
      setRecipes(response.results);
      //this one is not necessary?
      pageNumber.current = 1;
    }catch(error){
      console.log(error)
    }
  }
 
  // function onChange(evt:ChangeEvent<HTMLInputElement>){
  //   setSearchTerm(evt.target.value)
  // }
  async function handleViewMoreClick(){
    //get offset number, ex:page is 2, offset is 20
    //how to get page number? we need to keep track of page which starts with 1 hardcoded

    //call search recipe API, pass in the query and current page
    console.log('what is the pagenumber to start with', pageNumber)
    const nextPage = pageNumber.current + 1;
    console.log('next page is:', nextPage)

    try{


      const response = await api.searchRecipes(searchTerm, nextPage);
    // Extract the results array from the response
      const nextRecipes = response.results;

    // Update the recipes state by concatenating the existing recipes with the new ones
      setRecipes([...recipes, ...nextRecipes]);
      
      pageNumber.current = nextPage;
      
    }catch(error){
      console.log(error)
    }

  }


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
          <RecipeCard recipe={recipe}/>
      ))}

      <button className="view-more-button" onClick={handleViewMoreClick}>View More</button>
    </div>
  )
}

export default App;
