import React, { useState } from "react";

const IngredientManager = ({ ingredients, setIngredients }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const startEditing = (index, currentValue) => {
    setIsEditing(index);
    setEditValue(currentValue);
  };

  const saveEdit = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = editValue;
    setIngredients(updatedIngredients);
    setIsEditing(null);
    setEditValue("");
  };

  return (
    <div>
      <h2>Manage Ingredients</h2>
      <input
        type="text"
        placeholder="Enter a new ingredient"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value) {
            addIngredient(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button className="save-btn" onClick={() => saveEdit(index)}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{ingredient}</h3>
                <button
                  className="edit-btn"
                  onClick={() => startEditing(index, ingredient)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => removeIngredient(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientManager;