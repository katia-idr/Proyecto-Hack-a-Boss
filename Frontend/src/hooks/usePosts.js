import { useState, useEffect } from "react";
import { getAllPostsService } from "../services";
import { useSearchParams } from "react-router-dom";
import { useTokenContext } from "../Contexts/TokenContext";
import { toast } from "react-toastify";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useTokenContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const addComment = (idPost, comment) => {
    const postIndex = posts.findIndex((post) => {
      return post.idPost === idPost;
    });

    posts[postIndex].comments.unshift(comment);
    setPosts([...posts]);
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const data = await getAllPostsService(searchParams, token);

        setPosts(data);
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);

        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [searchParams, token]);

  return {
    searchParams,
    setSearchParams,
    posts,
    setPosts,
    loading,
    addComment,
  };
};

export default usePosts;
