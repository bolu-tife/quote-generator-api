const express = require('express');
const app = express();
const Joi = require('joi');

const { quotes } = require('./data/quotes');
const { getRandomElement } = require("./utils/getRandomElement");

app.use(express.json());


app.get("/api/quotes/random", (req, res) => {
  const quote = getRandomElement(quotes);
  res.send(quote);
});


app.get("/api/quotes/:author", (req, res) => {

  const result = quotes.filter((quote) => {
    return quote["author"] === req.params['author']
  });

  if (result == 0) {
    res.send("Oops, looks like we don't have that author in our database");
  } else {
    res.send(result);
  }
});


app.route("/api/quotes").get((req, res) => {
  res.send(quotes);
}).post((req, res) => {

  const { error } = validateQuote(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const quote = {
    quote: req.body.quote,
    author: req.body.author
  };

  if (quote.author.length == 0) {
    quote.author = "Unknown";
  }

  quotes.push(quote);
  res.send(quote);
});


function validateQuote(quote) {
  const schema = Joi.object({
    quote: Joi.string().required(),
    author: Joi.string().allow(null, '')
  });
  return schema.validate(quote);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));