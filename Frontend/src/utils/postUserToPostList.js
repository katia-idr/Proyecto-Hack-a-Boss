export const postUserToPostList = (user) => {
  const userInfo = user[0];
  const postList = user[1].map((userPost) => {
    let post = { ...userPost };
    post = {
      ...post,
      idUser: userInfo.id,
      username: userInfo.username,
      name: userInfo.name,
      lastname: userInfo.lastname,
      avatar: userInfo.avatar,
      privacy: userInfo.privacy,
      idPost: post.id,
    };

    delete post.id;

    return post;
  });
  return postList;
};
