import styles from "./FilterSearch.module.css";
import PropTypes from "prop-types";

function FilterSearch({
  onSearch,
  searchTerm,
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className={styles.filterSearchContainer}>
      <div className={styles.categoryFilter}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.button} ${
              selectedCategory === cat ? styles.active : ""
            }`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
        value={searchTerm}
        className={styles.input}
      />
    </div>
  );
}
FilterSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};
export default FilterSearch;
