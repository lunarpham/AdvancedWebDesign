const SearchBar = (props) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={props.filterText}
        onChange={props.handleFilterTextChange}
      />
      <p>
        <input
          type="checkbox"
          checked={props.inStockOnly}
          onChange={props.handleInStockChange}
        />{' '}
        Only show products in stock
      </p>
    </form>
  );
};

export default SearchBar;
