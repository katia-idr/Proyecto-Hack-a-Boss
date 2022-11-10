import Footer from "../../components/Footer";

import { Link } from "react-router-dom";
import logoHackAGram from "../../assets/images/logo.png";

const NotFoundPage = () => {
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
          <h2>Not found!!!! 404!!!</h2>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NotFoundPage;
