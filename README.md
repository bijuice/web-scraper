# Fullstack Diction Scraper

You can try out this web app using this link : https://web-scraper-arehmtulla.herokuapp.com/

## Description:

This is a diction scraper built primarily using Node and React. The app analyzes URLs for all unique words and their frequencies. It can also compare two URLs for their common words. This data is visualized using various tools such as a word cloud.

### Backend
#### Backend Packages/Technologies:
- Node JS
- express
- cheerio
- natural
- apos-to-lex-form
- cors
- morgan

#### Folder Structure
- app.js : main backend file
- services/scraper.js : does all web scraping, cleaning and counting

The backend of this app utilizes express to provide a REST API and serve the frontend. Within the services/scraper.js file it uses axios to make requests to each URL for web scraping and uses the cheerio package to separate the html from the text. This data then undergoes cleaning using the following steps: 
1. Uses apos-to-lex-form to remove contractions in words e.g I'm becomes I am.
2. Converts all text to lowercase.
3. Removes non-alphabetical characters
4. Uses the natural package to teokenize the string and create an array containing all the words.

This array is then passed through another function that counts the frequency of unique words and returns an array of arrays of the words and their frequencies. When comparing two URLs this process is run twice and an array of common words is returned. These results are then served up using a REST API.

### Frontend 

#### Frontend Packages/Technologies:
- React
- Sass/ node-sass
- axios
- react-wordcloud

#### Folder Structure
- frontend/src/App.js : main frontend file
- frontend/src/views : contains main views
- frontend/src/components : contains reusable components e.g loading spinner
- frontend/src/services/scraper.js : handles requests to the backend

The frontend of this App is built using React with Sass used for the stylings. The app uses axios to make requests to the backend then visualizes this data using the react-wordcloud library. The WordCloud component has input fields for one or two URLs. The UniqueWords component visualizes the data for one URL and the Compare component visualizes for two URLs.

## System Limitations

This system cannot parse web apps made using modern frameworks such as React because they serve a single html page and inject elements into it dynamically.

## Possible Improvements

- Use a web crawler such as Puppeteer to obtain data from web apps created using frameworks such as React
- Add sentiment analysis for each URL
- Add routing to frontend for cleaner code

## Installation Instructions

```
git clone https://github.com/bijuice/web-scraper.git
cd ./web-scraper/
npm install
cd ./frontend/
npm install
```

## Usage

Run server:
```
cd ./web-scraper/
node ./app.js
```
Navigate to localhost.

### References/Credits

- Text input styling from https://codepen.io/lucasyem/pen/ZEEYKdj
- Spinner from https://loading.io/css/
