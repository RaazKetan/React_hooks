import { useState, useCallback } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method?requestConfig.method:'GET',
        headers: requestConfig.header? requestConfig.header:{},
        body: requestConfig.body? JSON.stringify(requestConfig.body):null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
      
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
    //this dependsy should include applyData, but it is a function that will never change, so we don't need to include it and everything whcih we use inside the function
  },[requestConfig,applyData]);
  return {
    //properties:values
    isLoading,
    error,
    sendRequest,
  }
};
export default useHttp;
