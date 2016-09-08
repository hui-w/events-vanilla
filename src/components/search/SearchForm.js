import React, { PropTypes } from 'react';

import '../../styles/search-form.css';

const SearchForm = ({ onSearch }) => (
  <div className="search-form">
    <form onSubmit={() => onSearch("Pay")}>
      SearchForm
      <input type="submit" value="Search" />
    </form>
  </div>
);

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchForm;
