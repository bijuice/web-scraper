const axios = require("axios");
const cheerio = require("cheerio");

//fetches url data using axios and the html from the page
const getUrlData = async (url) => {
  return await axios
    .get(url)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const scrape = async (url) => {
  const urlData = await getUrlData(url);

  const $ = cheerio.load(urlData);

  console.log($.text());
};

module.exports = scrape;
