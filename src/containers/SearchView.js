import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { search, startSearch, clearSearch } from '../actions/events';
import { updatePreviousView } from '../actions/common';

import SubMenu from '../components/common/SubMenu';
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';

class SearchView extends Component {
  componentDidMount() {
    this.doSearch(this.props.params.keyword);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      this.doSearch(nextProps.params.keyword);
    }
  }

  componentWillUnmount() {
    const {
      activeYear,
      activeMonth
    } = this.props;
    this.props.dispatch(
      updatePreviousView('Search Results', this.props.location.pathname)
    );
  }

  onFormSubmit = (keyword) => {
    browserHistory.push(`/search/${keyword}`);
  };

  onItemClick(id) {
    browserHistory.push(`/event/${id}`);
  };

  doSearch(keyword) {
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
