import {RecipeSummary} from "../types";
import {useState, useEffect} from 'react';
import * as api from '../api';

interface Props {
    recipeId: string
}

const RecipeModal = ({recipeId}:Props) => {
    const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();
    
    useEffect(()=>{
        const fetchRecipeSummary = async()=>{
            try{
                const summaryRecipe = await api.getRecipeSummary(recipeId);
                setRecipeSummary(summaryRecipe)

            }catch(error){
                console.log(error)
            }
        }
        fetchRecipeSummary();
    },[recipeId])

    if(!recipeSummary) {
        return <></>
    }
     
    //call the end point to get summary
    

    return (
        <>
        
        <div className="overlay"></div>
        <div className="modal">

            <div className="modal-content">
                <div className="modal-header">
                    <h2>{recipeSummary.title}</h2>
                    <span className="close-btn">&times;</span>
                </div>
                <p>summary</p>
                <p dangerouslySetInnerHTML={{__html:recipeSummary.summary}}></p>
            </div>

        </div>
        </>
    )
}

export default RecipeModal;

//overlay is the background outside of modal which is greyed out
//dangerouslySetInnerHTML is used because the summary's format is html with a bunch of <b> init , we don't want it to show
