import { useState, useEffect } from "react";
import { Alert } from "react-native";

// custom Hook
const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn(); // e.g. getAllPosts()
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  // console.log(data);
  return { data, isLoading, refetch };
};

export default useAppwrite;
