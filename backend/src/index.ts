require('dotenv').config();

import express from 'express';
import cors from 'cors';
//import all from that file and bind to obj RecipeAPI
import * as RecipeAPI from './recipe-api';
// import searchRecipes from './recipe-api.ts';

const app = express();

app.use(express.json());
app.use(cors());

const apiKey = process.env.API_KEY;


app.get("/api/recipes/search", async(req, res)=>{
  // res.json({message:'success!'})

  //will need to add error handling to make sure the value of searchTerm and page exists
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  
  return res.json(results)
})

app.get("/api/recipes/:id/summary", async(req, res)=>{
  //id will be passed down from click
  const recipeId = req.params.id;

  const result = await RecipeAPI.getRecipeSummary(recipeId);

  return res.json(result)
})

app.listen(5000, ()=>{
  console.log("server running on localhost:5000")}
  );
