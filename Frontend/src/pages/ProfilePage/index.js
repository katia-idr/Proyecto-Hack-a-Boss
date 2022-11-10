import "./styles.css";
import { useParams } from "react-router-dom";
import { useTokenContext } from "../../Contexts/TokenContext";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import UserInfo from "../../components/UserInfo";
import UserPosts from "../../components/UserPosts";
import useUserById from "../../hooks/useUserById";

import Spinner from "../../components/Spinner";

const ProfilePage = () => {
  const { idUser } = useParams();
  const { token, loggedUser } = useTokenContext();

  const loggedUserInfo = loggedUser[0];

  const {
    searchParams,
    setSearchParams,
    userPosts,
    addComment,
    removePost,
    loading,
  } = useUserById(idUser);

  return (
    <>
      <Header searchParams={searchParams} setSearchParams={setSearchParams} />

      {loading && <Spinner />}
      {userPosts.length > 0 && (
        <main className="profilePage">
          {userPosts.length > 0 && userPosts[0].privacy === "public" && (
            <>
              <section className="userInfoContainer">
                <UserInfo
                  userInfo={userPosts[0]}
                  token={token}
                  loggedUserInfo={loggedUserInfo}
                />
              </section>
              <section>
                <UserPosts
                  userPosts={userPosts}
                  addComment={addComment}
                  removePost={removePost}
                />
              </section>
            </>
          )}
          {token && userPosts.length > 0 && userPosts[0].privacy === "private" && (
            <>
              <section className="userInfoContainer">
                <UserInfo
                  userInfo={userPosts[0]}
                  token={token}
                  loggedUserInfo={loggedUserInfo}
                />
              </section>
              <section>
                <UserPosts
                  userPosts={userPosts}
                  addComment={addComment}
                  removePost={removePost}
                />
              </section>
            </>
          )}
          {/* {!token &&
            userPosts.length > 0 &&
            userPosts[0].privacy === "private" && (
             
            )} */}
        </main>
      )}

      <Footer />
    </>
  );
};

export default ProfilePage;
