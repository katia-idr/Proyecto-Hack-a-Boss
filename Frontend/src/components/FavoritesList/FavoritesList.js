/* import useFavorites from "../../hooks/useFavorites"; */
import Spinner from "../Spinner";
import { useState, useEffect } from "react";
import { useTokenContext } from "../../context/TokenContext";

const FavoritesList = ({ getUserFavorites }) => {
  /*   const { favorites, errorMessage, loading } = useFavorites(); */

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useTokenContext();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/favorites`);

        if (res.ok) {
          const body = await res.json();

          setFavorites(body.data);
        } else {
          throw new Error("There was an error fetching the API");
        }
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  /* return { favorites, loading, errorMessage }; */

  return (
    <section>
      <h2>Mis Favoritos</h2>

      {loading && <Spinner />}

      {errorMessage && <p className="error">{errorMessage}</p>}

      {favorites.length > 0 && (
        <ul>
          {favorites.map((favoriteObject) => {
            const { id, favorite } = favoriteObject;

            return <li key={id}>{favorite}</li>;
          })}
        </ul>
      )}
      <p>No has añadido ningún favorito</p>
    </section>
  );
};

export default FavoritesList;
