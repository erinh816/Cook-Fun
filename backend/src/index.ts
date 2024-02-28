require('dotenv').config();

import express from 'express';
import cors from 'cors';
//import all from that file and bind to obj RecipeAPI
import * as RecipeAPI from './recipe-api';
// import searchRecipes from './recipe-api.ts';

const app = express();

app.use(express.json());
app.use(cors());


app.get("/api/recipes/search", async(req, res)=>{
  // res.json({message:'success!'})

  //will need to add error handling to make sure the value of searchTerm and page exists
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  
  return res.json(results)
})

app.listen(5000, ()=>{
  console.log("server running on localhost:5000")}
  );
