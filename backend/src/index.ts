require('dotenv').config();

import express from 'express';
import cors from 'cors';
//import all from that file and bind to obj RecipeAPI
import * as RecipeAPI from './recipe-api';
// import searchRecipes from './recipe-api.ts';
import { PrismaClient } from '@prisma/client';

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

const apiKey = process.env.API_KEY;

/**
 * Return recipes from searching a specific searchTerm from Spoonacular API
 */
app.get("/api/recipes/search", async(req, res)=>{
  // res.json({message:'success!'})

  //will need to add error handling to make sure the value of searchTerm and page exists
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  
  return res.json(results)
})

/**
 * Return recipe summary from Spoonacular API with a specific id
 */
app.get("/api/recipes/:id/summary", async(req, res)=>{
  //id will be passed down from click
  const recipeId = req.params.id;

  const result = await RecipeAPI.getRecipeSummary(recipeId);

  return res.json(result)
})

/**
 * add recipe to favorites
 */
app.post("/api/recipes/favorites", async(req,res)=>{
  const recipeId = req.body.recipeId;

  try{
    const favoriteRecipe = await prismaClient.favoriteRecipes.create(
      {
        data:{
          recipeId:recipeId
        }
      });
      return res.status(201).json(favoriteRecipe);

  }catch(error){
    console.log(error);
    //we don't want to return the error to the front end, it might contain sensitive information
    return res.status(500).json({error:"Oops, something went wrong"})
  }
})

app.listen(5000, ()=>{
  console.log("server running on localhost:5000")}
  );
