import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import Header from "../Header/Header";
import SavedNews from "../SavedNews/SavedNews";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";
import { getNewsArticles } from "../../utils/NewsApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSignInClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // ✅ Handle registration and login
  const handleRegister = (values) => {
    setIsLoading(true);
    registerUser(values)
      .then(() => loginUser({ email: values.email, password: values.password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return fetchUserData(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal(); // ✅ Close modal after login
      })
      .catch((error) => console.error("Registration or login failed:", error))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = (values) => {
    setIsLoading(true);
    loginUser(values)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return fetchUserData(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((error) => console.error("Login failed:", error))
      .finally(() => setIsLoading(false));
  };

  // ✅ NewsAPi
  const handleSearchSubmit = (keyword) => {
    setSearchResults([]);
    setErrorMessage("");
    setVisibleCount(3);
    setIsLoading(true);
    setHasSearched(true);

    getNewsArticles(keyword)
      .then((res) => {
        if (res.articles.length === 0) {
          setErrorMessage("Nothing Found");
        } else {
          setSearchResults(res.articles);
        }
      })
      .catch(() => {
        setErrorMessage(
          "Sorry, something went wrong during the request. Please try again later."
        );
      })
      .finally(() => setIsLoading(false));
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleSignInClick={handleSignInClick}
          onSearch={handleSearchSubmit}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSearch={handleSearchSubmit}
                searchResults={searchResults}
                isLoading={isLoading}
                errorMessage={errorMessage}
                visibleCount={visibleCount}
                onShowMore={handleShowMore}
                hasSearched={hasSearched}
                isLoggedIn={isLoggedIn}
              />
            }
          ></Route>
          <Route path="/saved-news" element={<SavedNews />}></Route>
        </Routes>
        <Footer />
      </div>
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        handleLogin={handleLogin}
        setActiveModal={setActiveModal}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeActiveModal}
        handleRegistration={handleRegister}
        setActiveModal={setActiveModal}
      />
    </div>
  );
}

export default App;
