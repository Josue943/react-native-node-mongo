import { useState } from 'react';

export default useApi = apiFun => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      setError(false);
      await apiFun(...args);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return {
    error,
    loading,
    request,
  };
};
