// eslint-disable-next-line react/prop-types
const SearchBar = ({filter, handleFilter}) => {
return (
  <div>
    <h1>Find countries</h1>
    <i className="fa fa-search" aria-hidden="true"></i>
     <input className="search-bar" value={filter} onChange={handleFilter} />
  </div>
)
};

export default SearchBar