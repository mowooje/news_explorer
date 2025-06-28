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
    <div className="searchform__container">
      <form className="searchform" onSubmit={handleSubmit}>
        <div className="searchform__field-wrapper">
          <input
            type="text"
            name="search"
            className="searchform__input"
            placeholder="Enter topic"
            required
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="searchform__btn">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
export default SearchForm;
