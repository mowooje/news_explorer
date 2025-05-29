import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import Header from "../Header/Header";
import SavedNews from "../SavedNews/SavedNews";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  return (
    <div className="page">
      <div className="page__content">
        <Header handleSignInClick={handleSignInClick} />

        <Routes>
          <Route path="/" element={<Main />}></Route>
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
