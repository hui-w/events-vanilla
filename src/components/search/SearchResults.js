import React, { PropTypes } from 'react';

import '../../styles/search-results.css';

const SearchResults = ({ results }) => (
  <div className="search-results">
  search-results: {results.length}
  </div>
);

SearchResults.propTypes = {
  results: PropTypes.array.isRequired
};

export default SearchResults;
