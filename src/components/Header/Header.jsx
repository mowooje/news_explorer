import { useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({
  handleSignInClick,
  onSearch,
  isLoggedIn,
  currentUser,
  onLogout,
}) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const headerClassName = `header ${
    isSavedNewsPage ? "header_theme_light" : ""
  }`;

  return (
    <header className={headerClassName}>
      <Navigation
        handleSignInClick={handleSignInClick}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={onLogout}
      />
      {!isSavedNewsPage && (
        <>
          <section className="header__text-container">
            <h1 className="header__title">What's going on in the world?</h1>
            <h2 className="header__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </h2>
          </section>
          <SearchForm onSearch={onSearch} />
        </>
      )}
    </header>
  );
}

export default Header;
