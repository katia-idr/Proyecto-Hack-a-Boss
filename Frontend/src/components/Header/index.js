import "./styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logoHackAGram from "../../assets/images/logo.png";
import MenuIcon from "../MenuIcon";
import HomeIcon from "../HomeIcon";
import SearchBar from "../SearchBar";

import { useTokenContext } from "../../Contexts/TokenContext";
import NotLoggedUserMenu from "../NotLoggedUserMenu";
import LoggedUserMenu from "../LoggedUserMenu";
import { useNavigate } from "react-router-dom";

const Header = ({ setSearchParams, searchParams }) => {
  const { token, loggedUser, setToken } = useTokenContext();
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="header">
      <Link to="/">
        <img
          className="header-logo "
          src={logoHackAGram}
          alt="Logo Hack a Gram"
        />
      </Link>
      <SearchBar
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />

      <button
        type="button"
        className="header-button"
        onClick={() => {
          navigate("/");
        }}
      >
        <HomeIcon />
      </button>
      <button onClick={toggleMenu} className="header-button">
        <MenuIcon />
      </button>
      {!token && <NotLoggedUserMenu menu={menu} />}
      {token && loggedUser.length > 0 && (
        <LoggedUserMenu
          menu={menu}
          loggedUser={loggedUser}
          setToken={setToken}
        />
      )}
    </header>
  );
};

export default Header;
