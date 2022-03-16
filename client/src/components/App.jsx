import React,  { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  //const [commonIngredients, setCommonIngredients] = useState(['salt', 'pepper', 'sugar', 'oil']);
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipeSuggestions, setRecipeSuggestions] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();
    let copyIngredients = [...ingredients];
    copyIngredients.push(ingredientInput);
    setIngredients(copyIngredients);
    setIngredientInput('');
  }

  async function searchRecipes(e) {
    e.preventDefault();
    let recommendations = await axios.get('/recipes', {
      params: {
        keywords: ingredients
      }
    });
    setRecipeSuggestions(recommendations);
  }

  return (
    <div>
    <h1>Recipe Search</h1>
    <form>
      <label>
        ingredient
        <input
        id='ingredient'
        value={ingredientInput}
        onChange={(e) => setIngredientInput(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Add</button>
      </label>
    </form>

    {ingredients.map((ingredient, index) => <li key={`ingredient-${index}`}>{ingredient}</li>)}
    <button onClick={searchRecipes}>Find Me Some Noms</button>
  </div>

  );
}

export default App;