import "./styles.css";
import PostsList from "../PostsList";
import { postUserToPostList } from "../../utils/postUserToPostList";
import { useState, useEffect } from "react";
import AlertIcon from "../AlertIcon";

const UserPosts = ({ userPosts, addComment, removePost }) => {
  const [profilePosts, setProfilePosts] = useState([]);

  useEffect(() => {
    setProfilePosts(postUserToPostList(userPosts));
  }, [userPosts]);

  return (
    <section>
      {profilePosts.length > 0 ? (
        <section className="postListContainer">
          <PostsList
            posts={profilePosts}
            addComment={addComment}
            removePost={removePost}
          />
        </section>
      ) : (
        <section className="container, post">
          <AlertIcon />
          <p>No hay post</p>
        </section>
      )}
    </section>
  );
};

export default UserPosts;
