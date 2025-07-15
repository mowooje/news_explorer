import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  authorize,
  checkToken,
  register as registerUser,
} from "../../utils/auth";
import { getItems, saveArticle, deleteArticle } from "../../utils/api";
import "./App.css";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import Header from "../Header/Header";
import SavedNews from "../SavedNews/SavedNews";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";
import { getNewsArticles } from "../../utils/NewsApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  // ✅ Check for stored token on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token check failed:", err);
          localStorage.removeItem("jwt");
        })
        .finally(() => setIsAuthChecked(true));
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getItems()
        .then((articles) => {
          if (Array.isArray(articles.data)) {
            setSavedArticles(articles.data);
          } else {
            setSavedArticles([]);
          }
        })
        .catch((err) => {
          console.error("Failed to get saved articles:", err);
          setSavedArticles([]);
        });
    } else {
      setSavedArticles([]);
    }
  }, [isLoggedIn]);

  const handleSignInClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // ✅ Handle registration and login
  const handleRegister = (values) => {
    setIsLoading(true);
    registerUser(values.name, values.email, values.password)
      .then(() => authorize(values.email, values.password))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((error) => console.error("Registration or login failed:", error))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = (values) => {
    setIsLoading(true);
    authorize(values.email, values.password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((error) => console.error("Login failed:", error))
      .finally(() => setIsLoading(false));
  };

  // ✅ Handle saving a new article
  const handleNewsSaved = (article) => {
    saveArticle(article)
      .then((newArticle) => {
        setSavedArticles([newArticle.data, ...savedArticles]);
      })
      .catch((err) => {
        console.error("Failed to save article:", err);
      });
  };

  // ✅ Handle removing a saved article
  const handleRemoveArticle = (article) => {
    deleteArticle(article._id)
      .then(() => {
        setSavedArticles((prevArticles) =>
          prevArticles.filter((item) => item._id !== article._id)
        );
      })
      .catch((err) => {
        console.error("Failed to delete article:", err);
      });
  };

  // ✅ Handle signout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
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
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={handleLogout}
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
                handleNewsSaved={handleNewsSaved}
                savedArticles={savedArticles}
              />
            }
          ></Route>
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  savedArticles={savedArticles}
                  currentUser={currentUser}
                  handleRemoveArticle={handleRemoveArticle}
                />
              </ProtectedRoute>
            }
          />
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
