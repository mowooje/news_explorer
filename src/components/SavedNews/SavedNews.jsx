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
    <div className="saved-news">
      <div className="saved-news__info">
        <h2 className="saved-news__title">Saved Articles</h2>
        <p className="saved-news__count">
          {currentUser.name}, you have {articlesToMap.length} saved articles
        </p>
        <p className="saved-news__keywords-label">
          By keywords:{" "}
          <span className="saved-news__keywords">{keywordsText}</span>
        </p>
      </div>
      <div className="saved-news__list-wrapper">
        <ul className="saved-news__list">
          {validArticles.map((item) => (
            <NewsCard
              key={item._id}
              data={item}
              handleRemoveArticle={() => handleRemoveArticle(item)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SavedNews;
