import "./styles.css";
import defaultAvatar from "../../assets/images/defaultavatar.png";

const Avatar = ({ avatar, name }) => {
  return (
    <>
      {!avatar && (
        <img className="avatar" src={defaultAvatar} alt={`Avatar de ${name}`} />
      )}
      {avatar && (
        <img
          className="avatar"
          src={`${process.env.REACT_APP_API_URL}/avatar/${avatar}`}
          alt={`Avatar de ${name}`}
        />
      )}
    </>
  );
};

export default Avatar;
