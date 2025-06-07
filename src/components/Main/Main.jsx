import React from "react";
import "./Main.css";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

function Main({
  searchResults,
  isLoading,
  errorMessage,
  visibleCount,
  onShowMore,
  hasSearched,
}) {
  return (
    <main className="main">
      {isLoading && <Preloader />}
      {!isLoading && hasSearched && (
        <NewsCard
          articles={searchResults}
          errorMessage={errorMessage}
          visibleCount={visibleCount}
          onShowMore={onShowMore}
        />
      )}
      <About />
    </main>
  );
}

export default Main;
