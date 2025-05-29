import React from "react";
import "./Main.css";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";

function Main() {
  return (
    <main className="main">
      <Preloader />
      <About />
    </main>
  );
}

export default Main;
