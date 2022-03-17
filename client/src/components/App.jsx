import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Result from './Result.jsx';

function App() {
  //const [commonIngredients, setCommonIngredients] = useState(['salt', 'pepper', 'sugar', 'oil']);
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    let copyIngredients = [...ingredients];
    copyIngredients.push(ingredientInput);
    setIngredients(copyIngredients);
    setIngredientInput('');
  }

  async function searchRecipes(e) {
    e.preventDefault();
    let searchResults = await axios.get('/recipes', {
      params: {
        keywords: ingredients
      }
    });
    setSearchResults(searchResults.data);
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

    {ingredients.map((ingredient, index) => <li key={`clientIngredient-${index}`}>{ingredient}</li>)}

    <button onClick={searchRecipes}>Find Me Noms</button>
    <div>
      {searchResults.map((result, index) => <Result key={`result-${index}`} data={result} pantryIngredients={ingredients}/>)}
    </div>
  </div>

  );
}

export default App;