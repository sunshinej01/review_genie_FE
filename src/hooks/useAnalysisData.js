import { useState, useEffect, useCallback } from 'react';
import { reviewAPI } from '@/services/apiClient';

export const useAnalysisData = (initialParams = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(
    async (newParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response = await reviewAPI.getAnalysisData({
          ...params,
          ...newParams,
        });

        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err.message || '데이터 조회에 실패했습니다.');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  const refreshData = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const updateParams = useCallback(newParams => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    params,
    fetchData,
    refreshData,
    updateParams,
  };
};
