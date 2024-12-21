import React, { useState } from "react";
import IngredientManager from "./components/IngredientsManager";
import RecipeManager from "./components/RecipeManager";
import RecipeList from "./components/RecipeList";
import data from "./Data/Data.json";
import './style.css';

const App = () => {
  const [ingredients, setIngredients] = useState(data.ingredients);
  const [recipes, setRecipes] = useState(data.recipes);

  return (
    <div>
      <h1>Recipe Generator & Manager</h1>
      <IngredientManager ingredients={ingredients}
setIngredients={setIngredients} />
      <RecipeManager recipes={recipes} setRecipes={setRecipes} />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default App;