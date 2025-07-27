import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({ currentUser, savedArticles, handleRemoveArticle }) {
  const articlesToMap = savedArticles || [];

  const validArticles = articlesToMap.filter(Boolean);

  const allKeywords = validArticles.map((item) => item.keyword).filter(Boolean);

  const uniqueKeywords = [...new Set(allKeywords)];

  const keywordsText =
    uniqueKeywords.length > 2
      ? `${uniqueKeywords.slice(0, 2).join(", ")} and ${
          uniqueKeywords.length - 2
        } others`
      : uniqueKeywords.join(", ");

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <main className="saved-news">
      <section className="saved-news__info">
        <p className="saved-news__title">Saved Articles</p>

        <h1 className="saved-news__count">
          {currentUser.name}, you have {articlesToMap.length} saved articles
        </h1>

        <p className="saved-news__keywords-label">
          By keywords:{" "}
          <span className="saved-news__keywords">{keywordsText}</span>
        </p>
      </section>

      <section className="saved-news__list-wrapper">
        <ul className="saved-news__list">
          <NewsCard
            articles={validArticles}
            visibleCount={validArticles.length}
            isLoggedIn={true}
            handleRemoveArticle={handleRemoveArticle}
            savedArticles={validArticles}
            isSavedPage={true}
          />
        </ul>
      </section>
    </main>
  );
}

export default SavedNews;
