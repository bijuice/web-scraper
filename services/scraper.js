const axios = require("axios");
const cheerio = require("cheerio");
const natural = require("natural");
const { WordTokenizer } = natural;
const aposToLexForm = require("apos-to-lex-form");

//get html data from url
const getUrlData = async (url) => {
  try {
    const resData = await axios.get(url);
    return resData.data; //fetch website data
  } catch (err) {
    console.log(err);
  }
};

//preprocesses and cleans data for further analysis
const dataCleaner = (str) => {
  const lexed = aposToLexForm(str); //converts contracted words such as I'm to their standard from i.e I am

  const cased = lexed.toLowerCase(); //converts to lowercase

  const alphaOnly = cased.replace(/[^a-zA-Z\s]+/g, ""); //removes non-alphabetical and special characters

  //tokenize the string into meaningful units and returns an array of unique words
  const tokenizer = new WordTokenizer();
  const tokenized = tokenizer.tokenize(alphaOnly);

  return tokenized;
};

//returns an object with word frequencies
function uniqueWordCount(strArray) {
  //counts number of unique words
  const occurrences = strArray.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  //converts into array for sorting
  const sorted = [];
  for (var word in occurrences) {
    sorted.push([word, occurrences[word]]);
  }

  //sorts by descending order
  sorted
    .sort(function (a, b) {
      return a[1] - b[1];
    })
    .reverse();

  return sorted;
}

const scraper = async (url) => {
  const urlData = await getUrlData(url);

  const data = cheerio.load(urlData).text(); //extracts text from html

  const cleanedData = dataCleaner(data); //cleans data

  const wordCount = uniqueWordCount(cleanedData); //gets word frequency

  return {
    uniqueWords: wordCount,
    uniqueWordsLength: cleanedData.length,
  };
};

module.exports = scraper;
