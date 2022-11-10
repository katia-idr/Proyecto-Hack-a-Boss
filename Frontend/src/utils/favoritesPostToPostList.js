export const userFavoritedPostToPostList = (favoritedPosts, commentposts) => {
  const postList = favoritedPosts.map((favoritedPost) => {
    let post = { ...favoritedPost };
    const comments = commentposts.filter((value) => {
      return value.idPost === post.idPost;
    });
    post = {
      ...post,
      comments: comments.length > 0 ? comments[0].comments : [],
    };

    return post;
  });
  return postList;
};
