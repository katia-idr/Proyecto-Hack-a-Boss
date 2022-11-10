import "./styles.css";
import { LikedIcon, UnlikedIcon } from "../LikeIcons";

import { useState } from "react";
import { toast } from "react-toastify";

const LikeButton = ({ idPost, token, setNumLikes, setIsLiked, isLiked }) => {
  const [className, setClassName] = useState("");
  return (
    <button
      type="button"
      onClick={async (event) => {
        try {
          setClassName("");

          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/post/${idPost}/like`,
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
          setNumLikes(body.data.numLikes.numLikes);
          setIsLiked(body.data.liked);
          setClassName("animate");
        } catch (error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }}
      className={`heart ${className}`}
    >
      {isLiked && <LikedIcon />}
      {!isLiked && <UnlikedIcon />}
    </button>
  );
};

export default LikeButton;
