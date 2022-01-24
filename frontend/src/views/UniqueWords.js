import { useState } from "react";
import ReactWordcloud from "react-wordcloud";

const UniqueWords = ({ data, wordCloudData, setData, setShowSpinner }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <div className="flex-container">
        <h1>
          Total of{" "}
          <span className="success-word">{data.uniqueWordsLength}</span> unique
          words
        </h1>

        <button className="btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Hide" : "Show All"}
        </button>
      </div>

      {showAll && (
        <div className="word-container">
          {data.uniqueWords.map((word) => {
            return (
              <h5>
                "<span className="success-word">{word[0]}</span>" appears{" "}
                {word[1]} times
              </h5>
            );
          })}
        </div>
      )}

      <h2>
        Top <span className="success-word">{wordCloudData.length}</span> Words:
      </h2>
      <ReactWordcloud
        words={wordCloudData}
        size={[1500, 500]}
        options={{ fontSizes: [10, 200], rotations: [-90] }}
      />

      <button
        className="btn"
        onClick={() => {
          setData(null);
          setShowSpinner(false);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default UniqueWords;
