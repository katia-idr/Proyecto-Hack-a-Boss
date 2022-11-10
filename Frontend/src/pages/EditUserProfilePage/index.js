import logoHackAGram from "../../assets/images/logo.png";
import EditProfileForm from "../../components/EditProfileForm";
import { useTokenContext } from "../../Contexts/TokenContext";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const EditUserProfilePage = () => {
  const { token, loggedUser, setLoggedUser } = useTokenContext();

  const loggedUserInfo = loggedUser[0];

  return (
    <>
      <header className="header">
        {loggedUser && loggedUser.length > 0 && (
          <Link to={`/profile/${loggedUserInfo.id}`}>
            <img
              className="header-logo "
              src={logoHackAGram}
              alt="Logo Hack a Gram"
            />
          </Link>
        )}
      </header>
      <main>
        {loggedUser && loggedUser.length > 0 && (
          <EditProfileForm
            token={token}
            loggedUser={loggedUser}
            setLoggedUser={setLoggedUser}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default EditUserProfilePage;
