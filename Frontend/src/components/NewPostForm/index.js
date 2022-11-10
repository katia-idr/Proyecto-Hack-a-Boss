import "./styles.css";
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RightArrow, LeftArrow } from "../ArrowIcons";
import DefaultPhotoNewPost from "../DefaultPhotoNewPost/DefaultoPhotoPost";

const NewPostForm = ({ loggedUser, token }) => {
  const [authorComment, setAuthorComment] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [images, setImages] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const loggedUserInfo = loggedUser[0];

  const { name, id } = loggedUserInfo;

  const navigate = useNavigate();
  const maxImages = 5 - images.length;

  const handleAddImages = (e) => {
    const fileList = e.target.files;

    if (fileList.length > maxImages) {
      toast.error(`Solo puedes añadir ${maxImages} como máximo`);
      return;
    }

    setImages([...images, ...fileList]);
  };

  const handleSubmnit = async (event) => {
    try {
      event.preventDefault();

      if (images.length === 0) {
        throw new Error("Necesitas seleccionar por lo menos una imagen");
      }

      const formData = new FormData();

      formData.append("authorComment", authorComment);
      formData.append("hashtag", hashtag);

      for (const image of images) {
        formData.append("post_photo", image);
      }

      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/new`, {
        method: "POST",
        headers: {
          Authorization: token,
        },

        body: formData,
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.message);
      }

      toast.success(body.message);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  const previousPhoto = (e) => {
    e.stopPropagation();
    if (currentPhoto === images.length - 1) {
      setCurrentPhoto(0);
      return;
    }
    setCurrentPhoto(currentPhoto + 1);
  };
  const nextPhoto = (e) => {
    e.stopPropagation();
    if (currentPhoto === 0) {
      setCurrentPhoto(images.length - 1);
      return;
    }
    setCurrentPhoto(currentPhoto - 1);
  };
  return (
    <>
      <form onSubmit={handleSubmnit}>
        <section>
          <ul className="newPostContainer">
            <li className="imageContainer">
              {images.length === 0 ? (
                <DefaultPhotoNewPost />
              ) : (
                <section className="photo-slider-form">
                  {images.map((image, index) => {
                    return (
                      <Fragment key={index}>
                        {index === currentPhoto && (
                          <>
                            {" "}
                            <img
                              className="slider-image"
                              src={URL.createObjectURL(image)}
                              alt={`Imagen subida por ${name}`}
                            />
                            <button
                              type="button"
                              className="close"
                              onClick={(e) => {
                                e.preventDefault();
                                setImages(images.filter((_, i) => i !== index));
                              }}
                            >
                              X
                            </button>
                          </>
                        )}
                      </Fragment>
                    );
                  })}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="previous_photo"
                        onClick={previousPhoto}
                      >
                        <LeftArrow />
                      </button>
                      <button
                        type="button"
                        className="next_photo"
                        onClick={nextPhoto}
                      >
                        <RightArrow />
                      </button>
                    </>
                  )}
                </section>
              )}
              {maxImages > 0 ? (
                <>
                  <input
                    id="image"
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleAddImages}
                  />
                  <label className="button" htmlFor="image">
                    Selecciona hasta {maxImages} imágenes más
                  </label>
                </>
              ) : null}
            </li>

            <li>
              <label htmlFor="authorComment">Comentario</label>
              <textarea
                className="textarea"
                id="authorComment"
                value={authorComment}
                onChange={(event) => {
                  setAuthorComment(event.target.value);
                }}
                required
              />
            </li>
            <li>
              <label htmlFor="hashtag">Hashtag</label>
              <input
                id="hashtag"
                placeholder="Introduce los hashtag separados por una coma"
                value={hashtag}
                onChange={(event) => {
                  setHashtag(event.target.value);
                }}
              />
            </li>

            <button className="principal">Publicar Post</button>
          </ul>
        </section>
      </form>
    </>
  );
};

export default NewPostForm;
