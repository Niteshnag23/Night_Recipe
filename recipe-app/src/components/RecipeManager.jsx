import React, { useState } from "react";

const RecipeManager = ({ recipes, setRecipes }) => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
  });

  const addRecipe = () => {
    if (newRecipe.name.trim() && newRecipe.ingredients.trim() && newRecipe.steps.trim()) {
      setRecipes([
        ...recipes,
        {
          name: newRecipe.name.trim(),
          ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()),
          steps: newRecipe.steps.split(",").map((item) => item.trim()),
        },
      ]);
      setNewRecipe({ name: "", ingredients: "", steps: "" });
    } else {
      alert("All fields are required to add a recipe.");
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
    </div>
  );
};

export default RecipeManager;
