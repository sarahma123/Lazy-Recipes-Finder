const express = require('express');
const app = express();
const cors = require('cors');
const controllers = require('./controllers.js');

app.use(cors());
app.use(express.static('client/dist'));

app.get('/recipes', controllers.get);

app.listen(3000, () => {
  console.log('listening on porrrt');
})