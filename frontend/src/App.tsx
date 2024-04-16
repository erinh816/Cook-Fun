import { useState, useRef, useEffect, FormEvent } from 'react';
import "./App.css";
import * as api from './api';
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { AiOutlineSearch } from "react-icons/ai";

//why don't we have this in types file?
type Tabs = "search" | "favorites";


function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  //the results from calling api is an array of a bunch of recipe objects, so we initialize the recipes as empty array
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);
  //for the modal
  //why do we want to have selected recipe as state(kinda a status for show/hide modal)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");

  const [favs, setFavs] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {

        const favoriteRecipes = await api.getFavoriteRecipes();
        //without .results can't map

        setFavs(favoriteRecipes.results);

      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteRecipes();
  }, []);


  /* for seperate of concerns, the fetch functionality */
  const handleSearchSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    try {
      // const recipes = await api.searchRecipes(searchTerm,1);
      const response = await api.searchRecipes(searchTerm, 1);
      console.log("what is my response?", response);
      // setRecipes(recipes.results);
      setRecipes(response.results);
      //this one is not necessary?
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  // function onChange(evt:ChangeEvent<HTMLInputElement>){
  //   setSearchTerm(evt.target.value)
  // }
  //above needs to import ChangeEvent

  async function handleViewMoreClick() {
    //get offset number, ex:page is 2, offset is 20
    //how to get page number? we need to keep track of page which starts with 1 hardcoded

    //call search recipe API, pass in the query and current page
    console.log('what is the pagenumber to start with', pageNumber);
    const nextPage = pageNumber.current + 1;
    console.log('next page is:', nextPage);

    try {
      const response = await api.searchRecipes(searchTerm, nextPage);
      // Extract the results array from the response
      const nextRecipes = response.results;

      // Update the recipes state by concatenating the existing recipes with the new ones
      setRecipes([...recipes, ...nextRecipes]);

      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  }

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      //post this parameter recipe to db
      await api.addFavoriteRecipe(recipe);

      //necessary!add it to favs state so UI immediately update because setState triggers rerendering
      setFavs([...favs, recipe]);

    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteRecipe = async (recipe: Recipe) => {
    try {
      //delete this parameter recipe from db
      await api.removeFavoriteRecipe(recipe);

      setFavs(favs.filter((favRecipe) => favRecipe.id !== recipe.id));

    } catch (error) {
      console.log(error);
    }

  };

  console.log("what is in my favs", favs);

  return (
    <div className="app-container">

      <div className="header">
        <img src="/egg.jpg"></img>
        <div className="title"><img className="nood" src="/noodgif.gif"></img>Cook Fun</div>
      </div>

      <div className="tabs">
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}> Search Recipe </h1>
        <h1
          className={selectedTab === "favorites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favorites")}> Favorites </h1>
      </div>

      {selectedTab === "search" && (
        <>
          <form onSubmit={handleSearchSubmit}>
            <input type="text"
              required
              placeholder="Enter a search term ..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            //  onChange = {onChange}
            >
            </input>
            <button type="submit"><AiOutlineSearch size={40} /></button>
          </form>

          {/* {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} clickCard={() => setSelectedRecipe(recipe)} onFavButtonClick={addFavoriteRecipe} />
          ))} */}
          <div className="recipe-grid">
            {recipes.map((recipe) => {
              //map through favs, if any match, return true
              //pass true/false down to child component to control heart
              const isFav = favs.some((favRecipe) => recipe.id === favRecipe.id);
              return (
                <RecipeCard
                  recipe={recipe}
                  clickCard={() => setSelectedRecipe(recipe)}
                  onFavButtonClick={isFav ? removeFavoriteRecipe : addFavoriteRecipe}
                  isFav={isFav} />
              );
            })}

          </div>


          <button className="view-more-button" onClick={handleViewMoreClick}>View More</button>
        </>
      )}

      {selectedTab === "favorites" && (
        <div className="recipe-grid">
          {favs.map((recipe) =>
            <RecipeCard
              recipe={recipe}
              clickCard={() => setSelectedRecipe(recipe)}
              onFavButtonClick={removeFavoriteRecipe}
              //always true
              isFav={true} />)}
        </div>
      )}

      {selectedRecipe ? <RecipeModal recipeId={selectedRecipe.id.toString()} closeModal={() => setSelectedRecipe(undefined)} /> : null}

    </div>
  );
}

export default App;

//selectedModal state controls show/hide modal
// app.tsx renders Card and Modal component
//Card: onClick is on Card component to setSelectedModal state to on/off
//Modal: <RecipeModal id={selectedModal.id}/>, decided by the selectedModal's state



//improvement idea:
//after clicking the card, open a brand new page with name, image and summary
//or just flip the card in place, front is the picture, back is the summary
//add isFlipped state to card component, if flipped, render summary, or render name and image
