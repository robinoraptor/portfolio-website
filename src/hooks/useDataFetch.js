import { useState, useEffect } from 'react';

export const useDataFetch = (dataFile) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import(`../data/${dataFile}.json`);
        setData(response.default);
        setLoading(false);
      } catch (err) {
        console.error(`Error loading ${dataFile}.json:`, err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [dataFile]);

  return { data, loading, error };
};