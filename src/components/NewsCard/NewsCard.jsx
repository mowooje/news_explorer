import React from "react";
import "./NewsCard.css";

function NewsCard({ articles, errorMessage, visibleCount, onShowMore }) {
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
        {articles.slice(0, visibleCount).map((article, i) => (
          <div className="newscard" key={i}>
            <img
              src={article.urlToImage}
              alt={article.title}
              className="newscard__image"
            />
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
                Read more
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
