import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    onSearch(keyword);
  };
  return (
    <form className="searchform" onSubmit={handleSubmit}>
      <section className="searchform__container">
        <input
          type="text"
          className="searchform__input"
          placeholder="Enter topic"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="searchform__btn">
          Search
        </button>
      </section>
    </form>
  );
}
export default SearchForm;
