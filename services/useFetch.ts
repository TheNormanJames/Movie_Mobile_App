import { useEffect, useState } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [loading, setLoading] = useState(autoFetch);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();

      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
