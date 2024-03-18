import {Recipe} from "../types"

interface Props {
    recipe: Recipe;
    onClick: ()=>void;
}


const RecipeCard = ({recipe, onClick}:Props) => {

    //add handle click card here because we have access to recipe.id

    //with the method added to api.ts, we can call it inside handle click function, return the result

    //reder the result in a modal(could be a child component of RecipeCard)

    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image}/>
            <div className="recipe-card-title">
                <h3>{recipe.title}</h3>
            </div>
        </div>
    )
}

export default RecipeCard;
