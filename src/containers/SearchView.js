import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { search } from '../actions/events';

class SearchView extends Component {
  componentDidMount() {
    this.props.dispatch(search('pay'));
  }

  render() {
    const {
      keyword,
      results
    } = this.props;
    console.log(results);
    return <div style={{ margin: '10px' }}>{keyword} </div>;
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
