import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../styles/Searchbox.css";

export default function SearchBox(props) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  return (
    <div className="header__searchContainer">
      <form onSubmit={handleSubmit}>
        <div className="header__search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search here.."
            onChange={(e) => setName(e.target.value)}
            className="header__searchInput"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            type="text"
          />
          <SearchIcon type="submit" className="header__searchIcon" />
        </div>
      </form>
    </div>
  );
}
