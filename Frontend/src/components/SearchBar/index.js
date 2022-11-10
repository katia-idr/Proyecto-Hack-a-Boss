import "./styles.css";
import SearchIcon from "../SearchIcon";
import { useState } from "react";

const SearchBar = ({ searchParams, setSearchParams }) => {
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);

  return (
    <form
      className="header-searcher"
      onSubmit={(event) => {
        event.preventDefault();

        const queryParams = {};

        if (search) {
          queryParams.search = search;
        }
        setSearchParams(new URLSearchParams(queryParams));

        setSearch("");
      }}
    >
      <input
        type="search"
        placeholder="¿Qué tipo de foto quieres buscar?"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
