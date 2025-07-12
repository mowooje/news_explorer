import { useEffect, useState } from "react";
import { getItems } from "../../utils/api";

function SavedNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getItems().then(setArticles);
  }, []);

  return (
    <section>
      <h2>Saved Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>{article.title}</li>
        ))}
      </ul>
    </section>
  );
}

export default SavedNews;
