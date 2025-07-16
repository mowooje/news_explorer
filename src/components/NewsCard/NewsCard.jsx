import React from "react";
import "./NewsCard.css";

function NewsCard({
  articles,
  errorMessage,
  visibleCount,
  onShowMore,
  isLoggedIn,
  handleNewsSaved,
  handleRemoveArticle,
  savedArticles = [],
  isSavedPage = false,
}) {
  if (errorMessage) {
    return <p className="newscard-section__message">{errorMessage}</p>;
  }

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="newscard-section">
      {!isSavedPage && (
        <h2 className="newscard-section__title">Search Results</h2>
      )}

      <div className="newscard-section__cards">
        {articles.slice(0, visibleCount).map((article, index) => {
          const isSaved = savedArticles.some((a) => a?.link === article.url);

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
                        const articleToRemove = savedArticles.find(
                          (a) => a.link === article.url
                        );
                        handleRemoveArticle(articleToRemove);
                      } else {
                        handleNewsSaved(article);
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

      {!isSavedPage && visibleCount < articles.length && (
        <button className="newscard-section__button" onClick={onShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCard;
