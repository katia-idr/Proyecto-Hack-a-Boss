import "./styles.css";
import UserInfo from "../UserInfo";
import { useNavigate } from "react-router-dom";

const FollowingUserList = ({ followingUsers, token, loggedUserInfo }) => {
  const navigate = useNavigate();

  return (
    followingUsers.length > 0 && (
      <ul className="followingUserInfo">
        {followingUsers.map((followUser, index) => {
          return (
            <li key={index} className="followUser">
              <UserInfo
                userInfo={followUser}
                token={token}
                loggedUserInfo={loggedUserInfo}
              />
              <button
                className="showProfileButton"
                type="button"
                onClick={() => {
                  navigate(`/profile/${followUser.id}`);
                }}
              >
                Ver perfil
              </button>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default FollowingUserList;
