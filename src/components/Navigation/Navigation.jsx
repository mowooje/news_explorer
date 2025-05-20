import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/NewsExplorer.svg";

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navigation__content">
        <div>
          <Link to="/">
            <img className="navigation__logo" src={logo} alt="nav logo" />
          </Link>
        </div>
        <div className="navigation__right">
          <Link to="/" className="navigation__home-link">
            Home
          </Link>
          <button className="navigation__sign-in-btn">Sign in</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
