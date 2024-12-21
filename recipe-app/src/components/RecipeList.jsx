import React from "react";

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.name}</h3>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            <p>Steps: {recipe.steps.join(" -> ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;