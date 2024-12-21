const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory database for ingredients (for now)
let ingredients = [];

// Google Gemini API Configuration
const GEMINI_API_KEY = "AIzaSyAfxlWigF8eiTxcnjcgSDTTa2FmpgfQ8q4";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// CRUD Operations for Ingredients
app.get("/ingredients", (req, res) => {
  res.json(ingredients);
});

app.post("/ingredients", (req, res) => {
  const { ingredient } = req.body;
  ingredients.push(ingredient);
  res.status(201).json({ message: "Ingredient added successfully!", ingredients });
});

app.put("/ingredients/:index", (req, res) => {
  const { index } = req.params;
  const { ingredient } = req.body;
  if (index >= 0 && index < ingredients.length) {
    ingredients[index] = ingredient;
    res.json({ message: "Ingredient updated successfully!", ingredients });
  } else {
    res.status(404).json({ message: "Ingredient not found!" });
  }
});

app.delete("/ingredients/:index", (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < ingredients.length) {
    ingredients.splice(index, 1);
    res.json({ message: "Ingredient deleted successfully!", ingredients });
  } else {
    res.status(404).json({ message: "Ingredient not found!" });
  }
});

// AI Recipe Suggestion Endpoint
app.post("/recipes", async (req, res) => {
  const { ingredients } = req.body;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [
        {
          parts: [
            {
              text: `Suggest recipes using these ingredients: ${ingredients.join(", ")}`
            }
          ]
        }
      ]
    }, {
      headers: { "Content-Type": "application/json" }
    });

    const suggestedRecipes = response.data.candidates[0]?.content?.parts[0]?.text || "No suggestions found.";
    res.json({ recipes: suggestedRecipes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
