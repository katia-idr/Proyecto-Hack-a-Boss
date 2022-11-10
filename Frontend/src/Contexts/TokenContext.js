import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const TokenContext = createContext();

export const CustomTokenContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token");
  const [loggedUser, setLoggedUser] = useState([]);

  useEffect(() => {
    if (!token) {
      setLoggedUser({});
      return;
    }

    const fetchUser = async () => {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/user/${decodedToken.id}`,
          { headers: { Authorization: token } }
        );

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setLoggedUser(body.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <TokenContext.Provider
      value={{ token, setToken, loggedUser, setLoggedUser }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const { token, setToken, loggedUser, setLoggedUser } =
    useContext(TokenContext);

  return { token, setToken, loggedUser, setLoggedUser };
};
