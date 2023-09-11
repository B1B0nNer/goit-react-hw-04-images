import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './searchBar.css';

class SearchBar extends Component {
  state = {
    query: '',
  };

  onInputChange = (evt) => {
    this.setState({ query: evt.target.value });
  };

  onSubmitHandler = (evt) => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    const { query } = this.state;

    return (
      <header className="searchBar">
        <form className="searchForm" onSubmit={this.onSubmitHandler}>
          <button type="submit" className="searchForm-button">
            <span className="searchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.onInputChange}
            value={query}
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
