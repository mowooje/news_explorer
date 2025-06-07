import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({ handleSignInClick, onSearch }) {
  return (
    <header className="header">
      <Navigation handleSignInClick={handleSignInClick} />
      <section className="header__text-container">
        <h1 className="header__title">What's going on in the world?</h1>
        <h2 className="header__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
      </section>
      <SearchForm onSearch={onSearch} />
    </header>
  );
}

export default Header;
