const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  uniqueWordsService,
  compareWordsService,
} = require("./services/scraper");

const app = express();
const port = process.env.PORT || 3001; // Heroku will need the PORT environment variable

//serves the frontend component
app.use(express.static(path.join(__dirname, "frontend/build")));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//enable cors for dev purposes
app.use(cors());

//morgan for logging
app.use(morgan("dev"));

// create application/json parser
var jsonParser = bodyParser.json();

app.post("/unique-words", jsonParser, async (req, res) => {
  //gets data from service
  try {
    const uniqueWordData = await uniqueWordsService(req.body.url);
    res.json(uniqueWordData);
  } catch (e) {
    res.send(e);
  }
});

app.post("/compare", jsonParser, async (req, res) => {
  try {
    const comparisonData = await compareWordsService(
      req.body.firstUrl,
      req.body.secondUrl
    );

    res.json(comparisonData);
  } catch (e) {
    res.send(e);
  }
});
