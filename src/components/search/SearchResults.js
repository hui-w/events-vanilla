import React, { PropTypes } from 'react';
import BusyIcon from '../common/BusyIcon';

import '../../styles/search-results.css';

const SearchResults = ({ results }) => {
  if (!results) {
    // searching
    return (
      <div className="search-results">
        <BusyIcon />
      </div>
    );
  } else {
    // show results
    return (
      <div className="search-results">
        search-results: {results.length}
      </div>
    );
  }
};

SearchResults.propTypes = {
  results: PropTypes.array
};

export default SearchResults;
