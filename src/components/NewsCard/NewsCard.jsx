import React from "react";
import "./NewsCard.css";

function NewsCard({
  articles,
  errorMessage,
  visibleCount,
  onShowMore,
  isLoggedIn,
}) {
  if (errorMessage) {
    return <p className="newscard__message">{errorMessage}</p>;
  }

  if (!articles.length) {
    return null;
  }

  return (
    <section className="newscard__section">
      <h2 className="newscard-section__title">Search Results</h2>
      <div className="newscard-section__cards">
        {articles.slice(0, visibleCount).map((article) => (
          <div className="newscard" key={article.url}>
            <div className="newscard__image-wrapper">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="newscard__image"
              />

              <button
                className={`newscard__save-icon ${
                  isLoggedIn ? "active" : "inactive"
                }`}
                onClick={() => {
                  if (!isLoggedIn) return;
                  // handle save logic here if logged in
                }}
              >
                {/* Use a filled icon if article is saved */}
              </button>
              {!isLoggedIn && (
                <span className="newscard__tooltip">
                  Sign in to save articles
                </span>
              )}
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
        ))}
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
