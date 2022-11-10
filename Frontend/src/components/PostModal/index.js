import "./styles.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PhotoSlider from "../PhotoSlider";
import CloseButton from "../CloseButton";
import { useTokenContext } from "../../Contexts/TokenContext";
import {
  getLikeStatus,
  getPostnumLikes,
  getUserFavorites,
} from "../../services";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import FavoriteButton from "../FavoriteButton";
import Avatar from "../Avatar";
import PostComments from "../PostComments";
const PostModal = ({
  post,
  setOpenModal,
  openModal,
  setSelectPost,
  addComment,
  removeFavorite,
  searchParams,
  removePost,
}) => {
  const {
    authorComment,
    avatar,
    comments,
    hashtag,
    name,
    lastname,
    photos,
    idPost,
    username,
    idUser,
  } = post;
  const { token, loggedUser } = useTokenContext();
  const [newComment, setNewComment] = useState("");
  const [numLikes, setNumLikes] = useState();
  const [isLiked, setIsLiked] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [hashtagArray, setHashtagArray] = useState([]);
  useEffect(() => {
    if (token) {
      const loadPostLikesandFavorited = async () => {
        try {
          const postNumLikes = await getPostnumLikes(idPost);
          const postIsLikedByUser = await getLikeStatus(idPost, token);
          const postIsFavoritedByUser = await getUserFavorites(
            token,
            searchParams
          );

          if (!postIsFavoritedByUser) {
            setIsFavorite(false);
          }

          if (postIsFavoritedByUser) {
            const postIsFavorited = postIsFavoritedByUser.find((post) => {
              return post.idPost === idPost;
            });
            if (!postIsFavorited) {
              setIsFavorite(false);
            } else {
              setIsFavorite(true);
            }
          }
          setNumLikes(postNumLikes);
          setIsLiked(postIsLikedByUser);
        } catch (error) {
          console.error(error.message);
          toast.error(error.message);
        }
      };
      loadPostLikesandFavorited();
    }
    if (hashtag) {
      setHashtagArray(hashtag.replace(/\s+/g, "").split(","));
    }
    // eslint-disable-next-line
  }, [hashtag, idPost, token]);

  const loggedUserInfo = loggedUser[0];

  return (
    <>
      <section className="modalBackground">
        <article className="modalContainer">
          <button className="closeButton" onClick={() => setOpenModal(false)}>
            <CloseButton />
          </button>
          <section className="postSlider">
            <PhotoSlider
              photos={photos}
              username={username}
              setOpenModal={setOpenModal}
              setSelectPost={setSelectPost}
              openModal={openModal}
            />
            {token && (
              <>
                <section className="icons">
                  <FavoriteButton
                    idPost={idPost}
                    token={token}
                    setIsFavorite={setIsFavorite}
                    isFavorite={isFavorite}
                    removeFavorite={removeFavorite}
                  />
                  <LikeButton
                    idPost={idPost}
                    token={token}
                    setNumLikes={setNumLikes}
                    setIsLiked={setIsLiked}
                    isLiked={isLiked}
                  />
                </section>
                <section className="infoLikesFavorited">
                  <p>
                    Le han dado like
                    <span className="numLikes">
                      {" "}
                      {numLikes ? numLikes : 0}{" "}
                    </span>
                    personas.
                  </p>
                </section>
              </>
            )}
          </section>
          <section className="postData">
            <section className="userInfo">
              <figure className="userAvatar">
                <Avatar avatar={avatar} name={name} />
              </figure>
              <section className="AuthorComment">
                <p className="authorName">
                  <Link to={`/profile/${idUser}`}>
                    {`${name} ${lastname !== null ? lastname : ""}`}
                  </Link>
                </p>
                <p className="authorUsername">
                  <Link to={`/profile/${idUser}`}>{`@${username}`}</Link>
                </p>
                <p className="authorComment">{authorComment}</p>
                {hashtag && (
                  <p className="hashtag">
                    {hashtagArray.map((ht, index) => {
                      return <span key={index}>{`#${ht} `}</span>;
                    })}
                  </p>
                )}
              </section>
            </section>
            {comments.length > 0 && (
              <section className="usersComments">
                <p className="commentsTitle">Comentarios</p>
                {comments.map((comment, index) => {
                  return (
                    <section key={index} className="userComment">
                      <PostComments comment={comment} />
                    </section>
                  );
                })}
              </section>
            )}
            {token && (
              <form
                onSubmit={async (event) => {
                  try {
                    event.preventDefault();
                    const res = await fetch(
                      `${process.env.REACT_APP_API_URL}/comments/new/${idPost}`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: token,
                        },
                        body: JSON.stringify({ body: newComment }),
                      }
                    );
                    const body = await res.json();
                    if (!res.ok) {
                      throw new Error(body.message);
                    }
                    addComment(idPost, body.data);
                    setNewComment("");
                    toast.success("¡Comentario añadido con éxito!");
                  } catch (error) {
                    console.error(error.message);
                    toast.error(error.message);
                  }
                }}
              >
                <textarea
                  className="commentForm"
                  value={newComment}
                  placeholder="Escribe un comentario"
                  onChange={(event) => {
                    setNewComment(event.target.value);
                  }}
                  required
                ></textarea>
                <button className="principal">Comentar</button>
              </form>
            )}
            {token && idUser === loggedUserInfo.id && removePost && (
              <button
                className="secundaryButton eliminar"
                onClick={async (event) => {
                  try {
                    const res = await fetch(
                      `${process.env.REACT_APP_API_URL}/posts/${idPost}`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: token,
                        },
                      }
                    );
                    const body = await res.json();
                    if (!res.ok) {
                      throw new Error(body.message);
                    }
                    toast.success(body.message);
                    removePost(idPost);
                  } catch (error) {
                    console.error(error.message);
                    toast.error(error.message);
                  }
                }}
              >
                Eliminar post
              </button>
            )}
          </section>
        </article>
      </section>
    </>
  );
};
export default PostModal;
