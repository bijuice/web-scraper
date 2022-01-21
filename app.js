const express = require("express");
const axios = require("axios");
const scrape = require("./controllers/scraper");

scrape("https://en.wikipedia.org/wiki/Cricket_World_Cup");
