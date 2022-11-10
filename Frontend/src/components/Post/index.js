import "./styles.css";
import PhotoSlider from "../PhotoSlider";

const Post = ({ post, setOpenModal, setSelectPost }) => {
  const { photos, username, idPost } = post;

  return (
    <>
      {photos.length > 0 && (
        <PhotoSlider
          idPost={idPost}
          photos={photos}
          username={username}
          setOpenModal={setOpenModal}
          setSelectPost={setSelectPost}
        />
      )}
    </>
  );
};

export default Post;
