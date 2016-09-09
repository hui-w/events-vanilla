import React, { PropTypes } from 'react';
import BusyIcon from '../common/BusyIcon';
import EventRow from '../common/EventRow';

import '../../styles/search-results.css';

const SearchResults = ({ results, onItemClick }) => {
  if (!results) {
    // searching
    return (
      <div style={{ padding: '20px 10px' }}>
        <BusyIcon />
      </div>
    );
  }

  // show results
  return (
    <div className="search-results">
      <div className="search-result-header">
        {results.length} search result{results.length > 1 && 's'}
      </div>
      {results.map((eventItem, index) =>
        <div key={index} className="search-result-item clearfix">
          <EventRow
            year={eventItem.year} month={eventItem.month} date={eventItem.date}
            item={eventItem} onItemClick={() => onItemClick(eventItem.id)}
          />
        </div>
      )}
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array,
  onItemClick: PropTypes.func
};

export default SearchResults;
