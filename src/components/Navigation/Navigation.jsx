import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/NewsExplorer.svg";
import menuIcon from "../../assets/menu-icon.svg";
import closeButton from "../../assets/close-button.svg";

function Navigation({ handleSignInClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="navigation">
      <div className="navigation__content">
        <Link to="/">
          <img
            className="navigation__logo"
            src={logo}
            alt="NewsExplorer logo"
          />
        </Link>

        <button
          className="navigation__menu-icon"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <img
            src={isMobileMenuOpen ? closeButton : menuIcon}
            alt={isMobileMenuOpen ? "close button" : "menu icon"}
          />
        </button>

        <div
          className={`navigation__right ${
            isMobileMenuOpen ? "navigation__right--open" : ""
          }`}
        >
          {isMobileMenuOpen && (
            <Link to="/" className="navigation__overlay-logo">
              <img
                className="navigation__logo"
                src={logo}
                alt="NewsExplorer logo"
              />
            </Link>
          )}
          <Link
            to="/"
            className="navigation__home-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <button
            className="navigation__sign-in-btn"
            onClick={() => {
              handleSignInClick();
              setIsMobileMenuOpen(false);
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
