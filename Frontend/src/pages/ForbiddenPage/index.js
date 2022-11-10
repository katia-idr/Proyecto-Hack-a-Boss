import "./styles.css";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoHackAGram from "../../assets/images/logo.png";
import AlertIcon from "../../components/AlertIcon";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <Link to="/">
          <img
            className="header-logo "
            src={logoHackAGram}
            alt="Logo Hack a Gram"
          />
        </Link>
      </header>
      <main>
        <section className="container">
          <section className="infoContainer">
            <AlertIcon />
            <p>No puedes visibilizar este perfil.</p>
            <p>¿Quieres verlo?</p>
            <button
              className="principal"
              onClick={() => {
                navigate("/login");
              }}
            >
              Loguéate
            </button>
            <p>o</p>
            <button
              className="principal"
              onClick={() => {
                navigate("/register");
              }}
            >
              Regístrate
            </button>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ForbiddenPage;
