import "./styles.css";
import { FavoritedIcon, UnfavoritedIcon } from "../FavoritesIcons";
import { useState } from "react";
import { toast } from "react-toastify";
const FavoriteButton = ({
  idPost,
  token,
  setIsFavorite,
  isFavorite,
  removeFavorite,
}) => {
  const [className, setClassName] = useState("");
  return (
    <button
      onClick={async (event) => {
        try {
          setClassName("");
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/post/${idPost}/favorite`,
            {
              method: "POST",
              headers: {
                Authorization: token,
              },
            }
          );
          const body = await res.json();
          if (!res.ok) {
            throw new Error(body.message);
          }
          setIsFavorite(body.data.favorite);
          if (removeFavorite && !body.data.favorite) {
            removeFavorite(idPost);
          }
          setClassName("animate");
          toast.success(body.message);
        } catch (error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }}
      className={`bookmark ${className}`}
    >
      {isFavorite && <FavoritedIcon />}
      {!isFavorite && <UnfavoritedIcon />}
    </button>
  );
};
export default FavoriteButton;
