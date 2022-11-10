import PostsList from "../PostsList";

const FavoritedPost = ({
  favoritedPosts,
  addComment,
  removeFavorite,
  searchParams,
}) => {
  return (
    <section>
      {favoritedPosts.length > 0 ? (
        <section className="postListContainer">
          <PostsList
            posts={favoritedPosts}
            addComment={addComment}
            removeFavorite={removeFavorite}
            searchParams={searchParams}
          />
        </section>
      ) : (
        <p>Este usuario aún no ha subido post</p>
      )}
    </section>
  );
};

export default FavoritedPost;
