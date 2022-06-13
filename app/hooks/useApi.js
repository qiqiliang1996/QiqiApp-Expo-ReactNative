import { useState } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...arg) => {
    // console.log(loading, '111');
    setLoading(true);
    // console.log(loading, '222');

    try {
      const response = await apiFunc(...arg);
      console.log(response, ' 111 res? long>?');
      // console.log(loading, '333');
      setLoading(false);
      // console.log(loading, '444');

      setError(false);
      setData(response);
      return response;
    } catch (error) {
      console.log(error, ' what is error message ? error??');
      setError(true);
      return error;
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useApi;
