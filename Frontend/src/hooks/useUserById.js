import { useState, useEffect } from "react";
import { getUserByIdService } from "../services";
import { useSearchParams } from "react-router-dom";
import { useTokenContext } from "../Contexts/TokenContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useUserById = (idUser) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useTokenContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const addComment = (idPost, comment) => {
    const postIndex = userPosts[1].findIndex((post) => {
      return post.id === idPost;
    });

    userPosts[1][postIndex].comments.unshift(comment);

    setUserPosts([...userPosts]);
  };

  const removePost = (idPost) => {
    const postIndex = userPosts[1].findIndex((post) => {
      return post.id === idPost;
    });

    userPosts[1].splice(postIndex, 1);
    setUserPosts([...userPosts]);
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const data = await getUserByIdService(
          navigate,
          idUser,
          searchParams,
          token
        );

        setUserPosts(data);
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
        setUserPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
    // eslint-disable-next-line
  }, [searchParams, token, idUser]);

  return {
    searchParams,
    setSearchParams,
    userPosts,
    setUserPosts,
    loading,
    addComment,
    removePost,
  };
};

export default useUserById;
