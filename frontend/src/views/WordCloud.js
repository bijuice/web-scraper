import { useState } from "react";
import { getData, compareSites } from "../services/scraper";
import Spinner from "../components/Spinner";
import UniqueWords from "./UniqueWords";
import Comparison from "./Comparison";
import { motion } from "framer-motion";

const WordCloud = () => {
  const [url, setUrl] = useState("");
  const [firstUrl, setFirstUrl] = useState("");
  const [secondUrl, setSecondUrl] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [wordCloudData, setWordCloudData] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  //url regex
  var urlRegex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
  );
  const onButtonClick = async () => {
    //verifies that url is valid before executing request
    if (url.match(urlRegex)) {
      setShowSpinner(true);

      const response = await getData(url); //fetches data

      setData(response.data);

      //format top 100 words for wordcloud
      const words = [];

      //checks if number of words on page is less than 100
      const max =
        response.data.uniqueWordsLength < 100
          ? response.data.uniqueWordsLength
          : 100;

      for (let i = 0; i < max; i++) {
        const word = {
          text: response.data.uniqueWords[i][0],
          value: response.data.uniqueWords[i][1],
        };

        words.push(word);
      }

      setWordCloudData(words);

      setError("");
    } else {
      setError("Invalid URL");
    }
  };

  const compare = async () => {
    //verifies urls are valid before making request
    if (firstUrl.match(urlRegex) && secondUrl.match(urlRegex)) {
      setShowSpinner(true);

      const response = await compareSites(firstUrl, secondUrl);

      setData(response.data);

      console.log(response.data);

      setError("");
    } else {
      setError("Invalid URL");
    }
  };

  return (
    <motion.div>
      {!data && (
        <div className="flex-container-column">
          {!showCompare && (
            <div className="form__group field flex-container">
              <div style={{ width: "80vw" }}>
                <input
                  autocomplete="off"
                  type="input"
                  className="form__field"
                  placeholder="Enter the url you'd like to scrape..."
                  name="url"
                  id="url"
                  required
                  onChange={(event) => {
                    setUrl(event.target.value);
                  }}
                />
                <label htmlFor="url" className="form__label">
                  Enter the URL you'd like to analyze...
                </label>

                <p style={{ color: "red" }}>{error}</p>
              </div>

              {showSpinner ? (
                <Spinner />
              ) : (
                <button className="btn" onClick={onButtonClick}>
                  Go
                </button>
              )}
            </div>
          )}

          {showCompare && (
            <div
              className="form__group field flex-container-column"
              style={{ width: "80vw" }}
            >
              <div className="flex-container-column" style={{ width: "100%" }}>
                <input
                  autocomplete="off"
                  type="input"
                  className="form__field"
                  placeholder="Enter the url you'd like to scrape..."
                  id="firstUrl"
                  name="firstUrl"
                  required
                  onChange={(event) => {
                    setFirstUrl(event.target.value);
                  }}
                />
                <label htmlFor="firstUrl">Enter first URL</label>

                <input
                  autocomplete="off"
                  type="input"
                  className="form__field"
                  placeholder="Enter the url you'd like to scrape..."
                  id="secondUrl"
                  name="secondUrl"
                  required
                  onChange={(event) => {
                    setSecondUrl(event.target.value);
                  }}
                />
                <label htmlFor="secondUrl">Enter second URL</label>

                <p style={{ color: "red" }}>{error}</p>
              </div>

              {showSpinner ? (
                <Spinner />
              ) : (
                <button
                  className="btn"
                  onClick={compare}
                  style={{ width: 100 }}
                >
                  Go
                </button>
              )}
            </div>
          )}

          <h1 style={{ fontSize: 50 }}>Or</h1>

          <button
            className="btn"
            style={{ width: 300, fontSize: 20 }}
            onClick={() => setShowCompare(!showCompare)}
          >
            {showCompare ? "Analyze One Site" : "Compare Two Sites"}
          </button>
        </div>
      )}

      {data && (
        <div>
          {showCompare && (
            <Comparison
              data={data}
              setData={setData}
              setShowSpinner={setShowSpinner}
            />
          )}
          {!showCompare && (
            <UniqueWords
              data={data}
              wordCloudData={wordCloudData}
              setData={setData}
              setShowSpinner={setShowSpinner}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default WordCloud;
