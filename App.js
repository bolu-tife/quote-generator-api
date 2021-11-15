const express = require('express');
const app = express();

const { quotes } = require('./data/quotes');
const { getRandomElement } = require("./utils/getRandomElement");



app.get("/api/quotes/random", (req, res) => {
  const quote = getRandomElement(quotes);
  res.send(quote );
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));