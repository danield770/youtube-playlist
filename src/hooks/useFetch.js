import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log('useFetch: url: ', url);
    if (url) {
      setIsLoading(true);
      setData(null);
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          setIsLoading(false);
          setData(json);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [url]);

  return { data, isLoading };
}

export default useFetch;
