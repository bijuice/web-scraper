const express = require("express");
const bodyParser = require("body-parser");
const scraper = require("./services/scraper");
const cors = require("cors");
const { send } = require("express/lib/response");

const app = express();

//enable cors for dev purposes
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json();

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

app.post("/unique-words", jsonParser, async (req, res) => {
  try {
    const { uniqueWords, uniqueWordsLength } = await scraper(req.body.url);
    res.json({
      uniqueWords,
      uniqueWordsLength,
    });
  } catch (e) {
    res.send(e);
  }
});
