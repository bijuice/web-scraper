import axios from "axios";

//to sets url based on whether app is in dev or prod mode
const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

const headers = {
  "Content-Type": "application/json",
};

//fetch data from backend api
export const getData = (url) => {
  try {
    return axios.post(
      `${baseUrl}/unique-words`,
      {
        url,
      },
      headers
    );
  } catch (e) {
    console.log(e);
  }
};

//compare two  sites
export const compareSites = (firstUrl, secondUrl) => {
  try {
    return axios.post(
      `${baseUrl}/compare`,
      {
        firstUrl,
        secondUrl,
      },
      headers
    );
  } catch (e) {
    console.log(e);
  }
};
