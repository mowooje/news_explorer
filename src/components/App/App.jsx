import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import SavedNews from "../SavedNews/SavedNews";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/saved-news" element={<SavedNews />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
