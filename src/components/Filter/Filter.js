export default function Filter({ toFind, onFilterChange }) {
  return (
    <div className="container">
      <p className="filterTitle">Find contacts by name</p>
      <input
        className="formInput"
        type="text"
        name="filter"
        value={toFind}
        onChange={onFilterChange}
      />
    </div>
  );
}
