import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue = "") => {
  const initialValue = JSON.parse(localStorage.getItem(key)) || defaultValue;

  const [data, setData] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
