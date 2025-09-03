import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";
import githubIcon from "../../assets/github-icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">&copy; 2025 Supersite, Powered by News API</p>
      <div className="footer__links-container">
        <div className="footer__links">
          <Link to="/" className="footer__link-home">
            Home
          </Link>
          <a
            className="footer__link-tripleten"
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__socials">
          <a href="https://github.com/mowooje" target="_blank" rel="noreferrer">
            <img
              src={githubIcon}
              alt="GitHub logo"
              className="footer__github-icon"
              target="_blank"
              rel="noreferrer"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
