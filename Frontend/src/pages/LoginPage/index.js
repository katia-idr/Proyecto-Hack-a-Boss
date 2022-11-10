import "./styles.css";
import LoginForm from "../../components/LoginForm";
import logoHackaGram from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <main className="loginFormMain">
      <section className="loginFormContainer">
        <img className="logo" src={logoHackaGram} alt="Logo de Hack a Gram" />
        <LoginForm />
        <p>¿No tienes cuenta en Hack a Gram?</p>
        <button type="button" className="secundaryButton">
          <Link to="/register">Regístrate</Link>
        </button>

        <p>O echa un vistazo como invitado</p>

        <button type="button" className="secundaryButton">
          <Link to="/">Entra sin hacer login</Link>
        </button>
      </section>
    </main>
  );
};

export default LoginPage;
