import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";

function Header({ userData, handleLogout, handleRegister, handleLogin }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const isLoggedIn = Boolean(userData?.name);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo-container">
          <Link to="/">
            <img src={logo} alt="logo" className="header__logo" />
          </Link>
          <p className="header__date">{currentDate}</p>
        </div>
        <div className="header__home-btns">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="header__user-name-link">
                <span className="header__user-name">{userData.name}</span>
              </Link>
              <button
                className="header__logout-btn"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="header__signup-btn"
                type="button"
                onClick={handleRegister}
              >
                Sign Up
              </button>
              <button
                className="header__login-btn"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
