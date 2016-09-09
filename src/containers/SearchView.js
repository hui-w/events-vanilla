import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { search, startSearch, clearSearch } from '../actions/events';
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';

class SearchView extends Component {
  componentDidMount() {
    this.search(this.props.params.keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      this.search(nextProps.params.keyword);
    }
  }

  onFormSubmit = (keyword) => {
    browserHistory.push(`/search/${keyword}`);
  };

  search(keyword) {
    if(keyword) {
      this.props.dispatch(search(keyword));
    } else {
      this.props.dispatch(clearSearch());
    }
  }

  render() {
    const {
      results
    } = this.props;
    return (
      <div className="search-view">
        <SearchForm keyword={this.props.params.keyword} onSearch={this.onFormSubmit} />
        <SearchResults results={results} />
      </div>
    );
  }
}

SearchView.propTypes = {
  results: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  const results = state.events.searchResults;
  return {
    results
  };
};

export default connect(
  mapStateToProps
)(SearchView);
