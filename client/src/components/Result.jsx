import React, { useState, useEffect } from 'react';

function Result(props) {
  const [pantryIngredients, setPantryIngredients] = useState(props.pantryIngredients);
  const [recipeIngredients, setRecipeIngredients] = useState(props.data.ingredients);
  const [recipeImage, setRecipeImage] = useState(props.data.image);
  const [recipeLink, setRecipeLink] = useState(props.data.url);

  function reArrangeRecipeIngredients() {
    var copy = [...recipeIngredients];
    for (let p = pantryIngredients.length - 1; p > -1; p--) {
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].food.includes(pantryIngredients[p])) {
          let haveIngredient = copy[i];
          copy.splice(i, 1);
          copy.unshift(haveIngredient);
        }
      }
    }
    return copy;
  }

  useEffect(() => {
    setRecipeIngredients(reArrangeRecipeIngredients());
  }, [pantryIngredients])


  return (
    <div>
      <a
        href={recipeLink}
        target='_blank'>
        <img src={recipeImage} />
      </a>

      <div className='ingredients'>
        {recipeIngredients.map((ingredient, index) => <li key={`recipeIngredient-${index}`}>
        <div className='container'>
          <span>
            {ingredient.text}
          </span>
          <span style={{ color: 'rgb(95, 95, 150)' }} className='oneIngredient'>
            {ingredient.food}
          </span>
        </div>
        </li>)}
      </div>


    </div>

  );
}

export default Result;