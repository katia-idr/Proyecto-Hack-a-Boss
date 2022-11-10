import { Link } from "react-router-dom";
import NewUserForm from "../../components/RegisterForm";
import logoHackaGram from "../../assets/images/logo.png";

const RegisterPage = () => {
  return (
    <main className="registerUserMain">
      <section className="registerUserFormContainer">
        <Link to={`/`}>
          <img
            className="header-logo "
            src={logoHackaGram}
            alt="Logo Hack a Gram"
          />
        </Link>

        <h1>¡Bienvenid@!</h1>
        <p>
          Completa tu registro para formar parte de la comunidad Hack a Gram
        </p>
        <NewUserForm />
      </section>
    </main>
  );
};

export default RegisterPage;
