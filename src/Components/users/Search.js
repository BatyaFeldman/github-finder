import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
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
      alertContext.setAlert("Please enter text", "light");
    } else {
      githubContext.searchUsers(text);
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
        {githubContext.users.length > 0 && (
          <button
            className="btn btn-light btn-block"
            onClick={githubContext.clearUsers}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;
