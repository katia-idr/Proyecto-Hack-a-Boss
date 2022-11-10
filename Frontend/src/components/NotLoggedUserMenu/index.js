import "./styles.css";
import { Link } from "react-router-dom";

const NotLoggedUserMenu = ({ menu }) => {
  return (
    <nav className={`header-nav not-logged ${menu ? "isActive" : ""}`}>
      <ul className="header-ul">
        <li className="header-li">
          <Link to="/login">Login</Link>
        </li>
        <li className="header-li">
          <Link to="/register">Regístrate</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NotLoggedUserMenu;
