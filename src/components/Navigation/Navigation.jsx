import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/NewsExplorer.svg";
import menuIcon from "../../assets/menu-icon.svg";
import closeButton from "../../assets/close-button.svg";

function Navigation({ handleSignInClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <img src={menuIcon} alt="menu icon" />
        </button>

        <div className="navigation__right">
          <Link to="/" className="navigation__home-link">
            Home
          </Link>
          <button
            className="navigation__sign-in-btn"
            onClick={handleSignInClick}
          >
            Sign in
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="navigation__mobile-menu">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                className="navigation__mobile-logo"
                src={logo}
                alt="NewsExplorer logo"
              />
            </Link>
            <button
              className="navigation__close-icon"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src={closeButton} alt="close icon" />
            </button>
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
        )}
      </div>
    </nav>
  );
}

export default Navigation;
