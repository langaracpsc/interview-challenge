const SearchBar = ({ searchValue, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        name="search"
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search movies..."
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchBar;
