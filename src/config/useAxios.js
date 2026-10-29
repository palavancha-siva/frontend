import { useState, useCallback } from 'react';
import axiosInstance from './Axios';

export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const data = await axiosInstance(config);
      setLoading(false);
      return { data, error: null };
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { data: null, error: err.message };
    }
  }, []);

  return { request, loading, error };
};

export default useAxios;
