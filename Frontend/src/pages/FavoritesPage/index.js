import "./styles.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useFavoritedPosts from "../../hooks/useFavoritePosts";
import Spinner from "../../components/Spinner";
import FavoritedPost from "../../components/FavoritedPost";
import AlertIcon from "../../components/AlertIcon";

const FavoritesPage = () => {
  const {
    searchParams,
    setSearchParams,
    favoritedPosts,
    loading,
    addComment,
    removeFavorite,
  } = useFavoritedPosts();

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />
      <main>
        {loading && <Spinner />}
        {favoritedPosts && favoritedPosts.length > 0 && (
          <section className="favoritedPostListContainer">
            <h3 className="favoritos">Mis Favoritos</h3>
            <FavoritedPost
              favoritedPosts={favoritedPosts}
              addComment={addComment}
              removeFavorite={removeFavorite}
              searchParams={searchParams}
            />
          </section>
        )}
        {!favoritedPosts && (
          <section className="container">
            <AlertIcon />
            <p>Aun no tienes favoritos</p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default FavoritesPage;
