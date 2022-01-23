import { useState } from "react";

const Comparison = ({ data, setData, setShowSpinner }) => {
  const [showFirst, setShowFirst] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", gap: 50 }}>
        {/* first column */}
        <div>
          <div className="flex-container">
            <h3>
              First website has a total of {"\t"}
              <span className="success-word">{data.firstWordsLength}</span>{" "}
              unique words
            </h3>
          </div>

          {showFirst && (
            <div className="word-container" style={{ width: 500 }}>
              {data.firstWords.map((word) => {
                return (
                  <h5>
                    "<span className="success-word">{word[0]}</span>" appears{" "}
                    {word[1]} times
                  </h5>
                );
              })}
            </div>
          )}
        </div>

        {/* combined column */}
        <div>
          <div className="flex-container">
            <h3>
              They share {"\t"}
              <span className="success-word">
                {data.commonWordsLength}
              </span>{" "}
              words
            </h3>
          </div>

          {showFirst && (
            <div className="word-container" style={{ width: 500 }}>
              {data.commonWords.map((word) => {
                return (
                  <h5>
                    "<span className="success-word">{word}</span>"
                  </h5>
                );
              })}
            </div>
          )}
        </div>

        {/* second column */}
        <div>
          <div className="flex-container">
            <h3>
              Second website has a total of {"\t"}
              <span className="success-word">
                {data.secondWordsLength}
              </span>{" "}
              unique words
            </h3>
          </div>

          {showFirst && (
            <div className="word-container" style={{ width: 500 }}>
              {data.secondWords.map((word) => {
                return (
                  <h5>
                    "<span className="success-word">{word[0]}</span>" appears{" "}
                    {word[1]} times
                  </h5>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <button
        className="btn"
        style={{ width: 200 }}
        onClick={() => setShowFirst(!showFirst)}
      >
        {showFirst ? "Hide" : "Show All Words"}
      </button>

      <h2>
        Top <span className="success-word">100</span> Words:
      </h2>

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

export default Comparison;
