import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { search } from '../actions/events';
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';

class SearchView extends Component {
  componentDidMount() {
    this.props.dispatch(search('pay'));
  }

  onSearch = (keyword) => {
    browserHistory.push(`/search/${keyword}`);
  };

  render() {
    const {
      keyword,
      results
    } = this.props;
    console.log(results);
    return (
      <div className="search-view">
        <SearchForm keyword={keyword} onSearch={this.onSearch} />
        <SearchResults results={results} />
      </div>
    );
  }
}

SearchView.propTypes = {
  keyword: PropTypes.string,
  results: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  const keyword = state.events.searchKeyword;
  const results = state.events.searchResults;
  return {
    keyword,
    results
  };
};

export default connect(
  mapStateToProps
)(SearchView);
