import React, { useState, useEffect } from 'react';

function Result(props) {
  const [pantryIngredients, setPantryIngredients] = useState(props.pantryIngredients);
  const [recipeIngredients, setRecipeIngredients] = useState(props.data.ingredients);
  const [recipeImage, setRecipeImage] = useState(props.data.image);
  const [recipeLink, setRecipeLink] = useState(props.data.url);

  function ingredientStyle(ingredient) {
    let boldStyle = {
      color: 'rgb(75, 75, 116)',
      fontWeight: 'bold'
    };

    let noBoldStyle = {
      color: 'rgb(95, 95, 150)',
    };

    // for (let i = 0; i < pantryIngredients.length; i++) {
    //   if (ingredient.includes(pantryIngredients[i])) {
    //     return boldStyle;
    //   }
    // }
    // return noBoldStyle;


    if (pantryIngredients.find(item => ingredient.includes(item))) {
      return boldStyle;
    } else {
      return noBoldStyle;
    }
  }

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
  useEffect(() => { setPantryIngredients(props.pantryIngredients) }, [props.pantryIngredients]);

  useEffect(() => {
    setRecipeIngredients(reArrangeRecipeIngredients());
  }, [pantryIngredients]);

  function addToPantry(e) {
    e.preventDefault();
    let copyPantry = [...pantryIngredients];
    copyPantry.push(e.target.id);
    setPantryIngredients(copyPantry);
  }


  return (
    <div className='recipe-card-container'>
      <div>
        <a href={recipeLink} target='_blank'>
          <h4>{props.data.label}</h4>
        </a>
        <a
          href={recipeLink}
          target='_blank'>
          <img src={recipeImage} />
        </a>
      </div>

      <div className='all-ingredients-container'>
        {recipeIngredients.map((ingredient, index) => <li key={`recipeIngredient-${index}`}>
          <div className='recipe-ingredients-container'>
            <span className='recipe-text'>
              {ingredient.text}
            </span>
            <span
              id={ingredient.food}
              className='recipe-one-word'
              style={ingredientStyle(ingredient.food)}
              onClick={(e) => {
                addToPantry(e);
                props.onClick(e);
              }}>
              {ingredient.food}
            </span>
          </div>
        </li>)}
      </div>


    </div>

  );
}

export default Result;