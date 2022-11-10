import { Navigate, Link } from "react-router-dom";
import NewPostForm from "../../components/NewPostForm";
import Footer from "../../components/Footer";
import { useTokenContext } from "../../Contexts/TokenContext";

import logoHackAGram from "../../assets/images/logo.png";

const NewPostPage = () => {
  const { token, loggedUser } = useTokenContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <header className="header">
        {loggedUser[0] && (
          <Link to={`/profile/${loggedUser[0].id}`}>
            <img
              className="header-logo "
              src={logoHackAGram}
              alt="Logo Hack a Gram"
            />
          </Link>
        )}
      </header>

      <main className="homePage">
        {loggedUser.length > 0 && (
          <section className="newPostForm">
            <NewPostForm loggedUser={loggedUser} token={token} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default NewPostPage;
