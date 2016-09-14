import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { search, clearSearch } from '../actions/events';
import { updatePreviousView } from '../actions/common';
import { filterList } from '../util';

import SubMenu from '../components/common/SubMenu';
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';

class SearchView extends Component {
  componentDidMount() {
    this.doSearchForParam(this.props.params.keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      this.doSearchForParam(nextProps.params.keyword);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(
      updatePreviousView('Search Results', this.props.location.pathname)
    );
  }

  onFormSubmit(keyword) {
    browserHistory.push(`/search/${keyword}`);
  }

  onItemClick(id) {
    browserHistory.push(`/event/${id}`);
  }

  doSearchForParam(keyword) {
    if (!keyword) {
      // Keyword cleared: clear the search result
      this.props.dispatch(clearSearch());
    } else if (keyword != this.props.keyword) {
      // Keyword changed: search again
      this.props.dispatch(search(keyword));
    }
  }

  render() {
    const {
      results
    } = this.props;
    return (
      <div>
        <SubMenu>
          <SearchForm keyword={this.props.params.keyword} onSearch={this.onFormSubmit} />
        </SubMenu>
        <div className="search-view">
          <SearchResults results={results} onItemClick={(id) => this.onItemClick(id)} />
        </div>
      </div>
    );
  }
}

SearchView.propTypes = {
  results: PropTypes.array,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.object
};

const mapStateToProps = (state) => {
  const allResults = state.events.searchResults;
  const keyword = state.events.searchKeyword;
  const results = filterList(allResults, state.common.filters);
  return {
    keyword,
    results
  };
};

export default connect(
  mapStateToProps
)(SearchView);
