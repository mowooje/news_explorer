// export const baseUrl = "http://localhost:3000/";

// Simulate returning a list of saved articles
export function getItems() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: "card123",
          title: "Sample Article 1",
          description: "This is a stubbed saved article.",
          publishedAt: "2025-06-01",
          url: "https://example.com/sample1",
          urlToImage: "https://via.placeholder.com/400x200",
          source: { name: "HABR.COM" },
        },
        {
          _id: "card124",
          title: "Sample Article 2",
          description: "Another example of a saved article.",
          publishedAt: "2025-06-10",
          url: "https://example.com/sample2",
          urlToImage: "https://via.placeholder.com/400x200",
          source: { name: "HABR.COM" },
        },
      ]);
    }, 300);
  });
}

// Simulate saving an article
export function saveArticle(article) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: `saved_${Date.now()}`,
        ...article,
      });
    }, 300);
  });
}

// Simulate deleting a saved article
export function deleteArticle(articleId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: `Deleted article ${articleId}` });
    }, 300);
  });
}
