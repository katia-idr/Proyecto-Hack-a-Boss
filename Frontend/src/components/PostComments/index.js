import Avatar from "../Avatar";

const PostComments = ({ comment }) => {
  const { avatar, name, username, body } = comment;
  return (
    <>
      <figure className="commentsAvatar">
        <Avatar avatar={avatar} name={name} />
      </figure>
      <section className="commentInfo">
        <p className="commentUsername">{`@${username}`}</p>
        <p className="commentText">{body}</p>
      </section>
    </>
  );
};
export default PostComments;
