import React from "react";
import "./NewsCard.css";
import notFoundIcon from "../../assets/not-found.svg";

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
    return (
      <div className="not-found">
        {errorMessage === "Nothing Found" && (
          <img
            className="not-found__icon"
            src={notFoundIcon}
            alt="Nothing found"
          />
        )}
        <h3 className="not-found__title">
          {errorMessage === "Nothing Found" ? "Nothing found" : errorMessage}
        </h3>
        {errorMessage === "Nothing Found" && (
          <p className="not-found__subtitle">
            Sorry, but nothing matched your search terms.
          </p>
        )}
      </div>
    );
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
        {articles.slice(0, visibleCount).map((article) => {
          const isSaved = savedArticles.some(
            (savedArticle) =>
              (savedArticle.link || savedArticle.url) === article.url
          );

          const keyword = article.keyword;

          return (
            <div className="newscard" key={article._id || article.url}>
              <div className="newscard__image-wrapper">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="newscard__image"
                />

                {isSavedPage && keyword && (
                  <div className="newscard__keyword">{keyword}</div>
                )}

                <div className="newscard__save-wrapper">
                  <button
                    type="button"
                    className={`newscard__save-icon ${
                      isSavedPage
                        ? "newscard__trash-icon"
                        : isLoggedIn && isSaved
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      if (!isLoggedIn) return;

                      if (isSavedPage) {
                        handleRemoveArticle(article);
                      } else if (isSaved) {
                        const articleToRemove = savedArticles.find(
                          (savedArticle) =>
                            (savedArticle.link || savedArticle.url) ===
                            article.url
                        );
                        handleRemoveArticle(articleToRemove);
                      } else {
                        handleNewsSaved(article);
                      }
                    }}
                    aria-label={
                      isSavedPage
                        ? "Remove saved article"
                        : isSaved
                        ? "Unsave article"
                        : "Save article"
                    }
                  />
                  <span
                    className={`newscard__tooltip ${
                      isSavedPage || !isLoggedIn ? "visible" : ""
                    }`}
                  >
                    {isSavedPage
                      ? "Remove from saved"
                      : !isLoggedIn
                      ? "Sign in to save articles"
                      : ""}
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
