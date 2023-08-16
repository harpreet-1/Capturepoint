import { useState, useEffect } from "react";

function useApiRequest(apiUrl, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl, options);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiUrl, options]); // Make sure dependencies are set correctly

  return { data, loading, error };
}

export default useApiRequest;
