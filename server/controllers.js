const axios = require('axios');
const { appId, appKey } = require('./authorization.js');
const sampleData = require('../data/sampledata2.js');

module.exports = {
  get: async function (req, res) {
    const clientPreferences = req.query.keywords;
    const clientPreferencesString = req.query.keywords.join(',');


    let search = await axios.get('https://api.edamam.com/search', {
      params: {
        app_id: appId,
        app_key: appKey,
        q: `${clientPreferences}`
      }
    });

    // let search = sampleData;

    const suggestions = [];               //sample data is search.hits
    const recipesResults = search.data.hits;  //api data is search.data.hits

    for (let i = 0; i < recipesResults.length; i++) {
      let currentRecipe = recipesResults[i].recipe;
      if (req.query.amount && currentRecipe.ingredients.length !== parseInt(req.query.amount)) {
        continue;
      }
      let count = 0;

      for (let j = 0; j < clientPreferences.length; j++) {
        for (let ingredient of currentRecipe.ingredients) {
          if (ingredient.food.includes(clientPreferences[j])) {
            count = count + 1;
            break;
          }
        }
      }

      if (count === clientPreferences.length) {
        suggestions.push(currentRecipe);
      }

      if (suggestions.length === 5) {
        break;
      }

    }

    res.status(200).send(suggestions);

  }
}
