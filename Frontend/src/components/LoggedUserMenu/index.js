import "./styles.css";
import { Link } from "react-router-dom";

const LoggedUserMenu = ({ menu, setToken, loggedUser }) => {
  const loggedUserInfo = loggedUser[0];

  const { id } = loggedUserInfo;

  return (
    <nav className={`header-nav ${menu ? "isActive" : ""}`}>
      <ul className="header-ul">
        <li className="header-li">
          <Link to={`/profile/${id}`}>Mi perfil</Link>
        </li>
        <li className="header-li">
          <Link to="/post/new">Publicar Foto</Link>
        </li>
        <li className="header-li">
          <Link to="/favorites">Mis Favoritos</Link>
        </li>
        <li className="header-li">
          <Link to="/following">Mis Seguidos</Link>
        </li>
        <li className="header-li">
          <Link
            to="/"
            onClick={() => {
              setToken("");
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LoggedUserMenu;
