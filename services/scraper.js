const axios = require("axios");
const cheerio = require("cheerio");
const natural = require("natural");
const { WordTokenizer } = natural;
const aposToLexForm = require("apos-to-lex-form");
const e = require("express");

//get html data from url
const getUrlData = async (url) => {
  try {
    const resData = await axios.get(url);
    return resData.data; //fetch website data
  } catch (err) {
    return err;
  }
};

//preprocesses and cleans data for further analysis
const dataCleaner = (str) => {
  const lexed = aposToLexForm(str); //converts contracted words such as I'm to their standard from i.e I am

  const cased = lexed.toLowerCase(); //converts to lowercase

  const alphaOnly = cased.replace(/[^a-zA-Z\s]+/g, ""); //removes non-alphabetical and special characters

  //tokenize the string into meaningful units and returns an array of all the words
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

//analyzes one site
const uniqueWordsService = async (url) => {
  const urlData = await getUrlData(url);

  const data = cheerio.load(urlData).text(); //extracts text from html

  const cleanedData = dataCleaner(data); //cleans data

  const wordCount = uniqueWordCount(cleanedData); //gets word frequency

  return {
    uniqueWords: wordCount,
    uniqueWordsLength: wordCount.length,
  };
};

//two site comparison function
const compareSites = (first, second) => {
  //remove frequency counts from each array to make comparison possible
  const newFirst = [];
  first.forEach((element) => newFirst.push(element[0]));
  const newSecond = [];
  second.forEach((element) => newSecond.push(element[0]));

  //returns an array of common elements
  const commonWords = newFirst.filter((element) => newSecond.includes(element));
  return commonWords;
};

//compares two sites
const compareWordsService = async (firstUrl, secondUrl) => {
  //gets data for first url
  const { uniqueWords: firstWords, uniqueWordsLength: firstWordsLength } =
    await uniqueWordsService(firstUrl);

  //gets data for second url
  const { uniqueWords: secondWords, uniqueWordsLength: secondWordsLength } =
    await uniqueWordsService(secondUrl);

  const commonWords = compareSites(firstWords, secondWords); //gets comparison

  return {
    firstWords,
    firstWordsLength,
    secondWords,
    secondWordsLength,
    commonWords,
    commonWordsLength: commonWords.length,
  };
};

module.exports = { uniqueWordsService, compareWordsService };
