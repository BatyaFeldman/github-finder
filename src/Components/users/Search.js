import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  //form inputs always component level state (even if using context, redux, etc)

  const [text, setText] = useState("");

  //if we don't use arrow functions, we would have to use binding...in general in react...
  const onChange = (e) => {
    //if there are a few fields, can use same onChange function and instead of putting name of input, can do [e.target.name]
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter text", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        ></input>
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        ></input>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
