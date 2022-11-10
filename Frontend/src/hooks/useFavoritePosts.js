import { useState, useEffect } from "react";
import { getUserFavorites } from "../services";
import { useSearchParams } from "react-router-dom";
import { useTokenContext } from "../Contexts/TokenContext";
import { toast } from "react-toastify";

const useFavoritedPosts = () => {
  const [favoritedPosts, setFavoritedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useTokenContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const addComment = (idPost, comment) => {
    const postIndex = favoritedPosts.findIndex((post) => {
      return post.idPost === idPost;
    });

    favoritedPosts[postIndex].comments.unshift(comment);
    setFavoritedPosts([...favoritedPosts]);
  };

  const removeFavorite = (idPost) => {
    const postIndex = favoritedPosts.findIndex((post) => {
      return post.idPost === idPost;
    });
    favoritedPosts.splice(postIndex, 1);
    setFavoritedPosts([...favoritedPosts]);
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const data = await getUserFavorites(token, searchParams);

        setFavoritedPosts(data);
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
        setFavoritedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [searchParams, token]);

  return {
    searchParams,
    setSearchParams,
    favoritedPosts,
    setFavoritedPosts,
    loading,
    addComment,
    removeFavorite,
  };
};

export default useFavoritedPosts;
