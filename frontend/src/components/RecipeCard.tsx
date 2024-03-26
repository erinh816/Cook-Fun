import { Recipe } from "../types";
import { AiOutlineHeart } from "react-icons/ai";

interface Props {
    recipe: Recipe;
    clickCard: () => void;
    onFavButtonClick: (recipe: Recipe) => void;
}


const RecipeCard = ({ recipe, clickCard, onFavButtonClick }: Props) => {

    //add handle click card here because we have access to recipe.id

    //with the method added to api.ts, we can call it inside handle click function, return the result

    //reder the result in a modal(could be a child component of RecipeCard)

    return (
        <div className="recipe-card" onClick={clickCard}>
            <img src={recipe.image} />
            <div className="recipe-card-title">
                <span onClick={(event) => {
                    //because of the nested onClick event, with this code, when we click on this specific element, it'll ignore the outer onClick
                    event.stopPropagation();
                    onFavButtonClick(recipe);
                }}>
                    <AiOutlineHeart size={25} />
                </span>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    );
};

export default RecipeCard;
