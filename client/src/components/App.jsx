import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Result from './Result.jsx';

function App() {
  //const [commonIngredients, setCommonIngredients] = useState(['salt', 'pepper', 'sugar', 'oil']);
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [amountOfIngredients, setAmount] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    let copyIngredients = [...ingredients];
    copyIngredients.push(ingredientInput);
    setIngredients(copyIngredients);
    setIngredientInput('');
  }

  async function searchRecipes(e) {
    e.preventDefault();
    let getResults = await axios.get('/recipes', {
      params: {
        keywords: ingredients,
        amount: amountOfIngredients
      }
    });
    setSearchResults([]);
    setSearchResults(getResults.data);
  }

  function deletePantryIngredient(e, deleteIngredient) {
    e.preventDefault();
    let copyIngredients = ingredients.filter(ingredient => ingredient !== deleteIngredient);
    setIngredients(copyIngredients);
  }

  function addToPantry(selected) {
    let copyIngredients = [...ingredients];
    copyIngredients.push(selected.target.id);
    setIngredients(copyIngredients);
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

      <form>
        <label>
          # of ingredients
          <input
            id='numberOfIngredients'
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </label>
      </form>

      {ingredients.map((ingredient, index) => <li
        key={`clientIngredient-${index}`}
        value={ingredient}
        onClick={(e) => deletePantryIngredient(e, ingredient)}
        >{ingredient} <button>-</button></li>)}


      <button onClick={searchRecipes}>Find Me Noms</button>
      <div>
        {searchResults.map((result, index) => <Result
        key={`result-${index}`}
        data={result}
        pantryIngredients={ingredients}
        onClick={addToPantry}/>)}
      </div>
    </div>

  );
}

export default App;