import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  //form inputs always component level state (even if using context, redux, etc)
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };
  //if we don't use arrow functions, we would have to use binding...in general in react...
  onChange = (e) => {
    //if there are a few fields, can use same onChange function and instead of putting name of input, can do [e.target.name]
    this.setState({ text: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter text", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChange}
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
  }
}

export default Search;
