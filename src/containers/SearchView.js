import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { search, clearSearch } from '../actions/search';

class SearchView extends Component {
  componentDidMount() {
    this.props.dispatch(search());
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearch());
  }

  render() {
    return <div style={{ margin: '10px' }}>Search Page</div>;
  }
}

SearchView.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
  const searchResults = state.search.results;
  return { searchResults };
};

export default connect(
  mapStateToProps
)(SearchView);
