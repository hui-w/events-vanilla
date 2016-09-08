import React, { Component, PropTypes } from 'react';

import '../../styles/search-form.css';

class SearchForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const onSearch = this.props.onSearch;
    onSearch("pay");
  }

  render() {
    const onSearch = this.props.onSearch;
    return (
      <div className="search-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value="" />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchForm;
