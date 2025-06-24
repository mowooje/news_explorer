import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({
  articles,
  errorMessage,
  visibleCount,
  onShowMore,
  isLoggedIn,
}) {
  const [savedArticles, setSavedArticles] = useState([]);

  if (errorMessage) {
    return <p className="newscard__message">{errorMessage}</p>;
  }

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="newscard__section">
      <h2 className="newscard-section__title">Search Results</h2>
      <div className="newscard-section__cards">
        {articles.slice(0, visibleCount).map((article) => {
          const isSaved = savedArticles.includes(article.url);

          return (
            <div className="newscard" key={article.url}>
              <div className="newscard__image-wrapper">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="newscard__image"
                />
                <div className="newscard__save-wrapper">
                  <button
                    type="button"
                    className={`newscard__save-icon ${
                      isLoggedIn && isSaved ? "active" : ""
                    }`}
                    onClick={() => {
                      if (!isLoggedIn) return;

                      if (isSaved) {
                        setSavedArticles((prevSaved) =>
                          prevSaved.filter((url) => url !== article.url)
                        );
                      } else {
                        setSavedArticles((prevSaved) => [
                          ...prevSaved,
                          article.url,
                        ]);
                      }
                    }}
                    aria-label="Save article"
                  />
                  <span
                    className={`newscard__tooltip ${
                      !isLoggedIn ? "visible" : ""
                    }`}
                  >
                    Sign in to save articles
                  </span>
                </div>
              </div>

              <div className="newscard__content">
                <p className="newscard__date">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="newscard__title">{article.title}</h3>
                <p className="newscard__description">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="newscard__link"
                >
                  {article.source.name}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < articles.length && (
        <button className="newscard__button" onClick={onShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCard;
