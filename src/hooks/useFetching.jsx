import { useState, useEffect } from "react";
import axios from "axios";

export const useFetching = (url) => {
  const [results, setResults] = useState(null);
  const [errorApi, setErrorApi] = useState(false);

  useEffect(() => {
    axios({url: url})
      .then(res => {
        setResults(res.data);
        setErrorApi(false);
      })
      .catch(error => {
        setErrorApi(true);
        console.error(error.message);
      })
  }, [url]);

  return { results, errorApi, setResults, setErrorApi }
};