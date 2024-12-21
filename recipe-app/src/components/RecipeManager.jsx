
import React, { useState } from "react";

const RecipeManager = ({ recipes, setRecipes }) => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
  });
  const [searchIngredient, setSearchIngredient] = useState("");
  const [fetchedRecipes, setFetchedRecipes] = useState([]);

  const addRecipe = () => {
    if (newRecipe.name && newRecipe.ingredients && newRecipe.steps) {
      setRecipes([
        ...recipes,
        {
          name: newRecipe.name,
          ingredients: newRecipe.ingredients.split(","),
          steps: newRecipe.steps.split(","),
        },
      ]);
      setNewRecipe({ name: "", ingredients: "", steps: "" });
    }
  };

  const fetchRecipesByIngredient = async () => {
    if (!searchIngredient.trim()) return;

    try {
      const response = await fetch(
        `https://your-api-endpoint.com/search?ingredient=${searchIngredient}&key=AIzaSyA9bzRLesQezoC5nnhYid_3NG4geyX7j5Y`
      );
      const data = await response.json();

      if (response.ok) {
        setFetchedRecipes(data.recipes || []); // Assuming API returns an array of recipes
      } else {
        console.error("Error fetching recipes:", data.message);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <input
        type="text"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        placeholder="Recipe Name"
      />
      <textarea
        placeholder="Ingredients (comma-separated)"
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, ingredients: e.target.value })
        }
        value={newRecipe.ingredients}
      ></textarea>
      <textarea
        placeholder="Steps (comma-separated)"
        onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
        value={newRecipe.steps}
      ></textarea>
      <button onClick={addRecipe}>Add Recipe</button>

      <h2>Search Recipes by Ingredient</h2>
      <input
        type="text"
        value={searchIngredient}
        onChange={(e) => setSearchIngredient(e.target.value)}
        placeholder="Enter ingredient"
      />
      <button onClick={fetchRecipesByIngredient}>Search</button>

      <h3>Search Results:</h3>
      <ul>
        {fetchedRecipes.map((recipe, index) => (
          <li key={index}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeManager;
