import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="searchform">
      <section className="searchform__container">
        <input
          type="text"
          className="searchform__input"
          placeholder="Enter topic"
        />
        <button type="submit" className="searchform__btn">
          Search
        </button>
      </section>
    </form>
  );
}
export default SearchForm;
