import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleNameChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      console.log('Type something in the search field');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <ImSearch className={css.searchImg} />
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
