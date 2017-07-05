import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/search-form.css';

class SearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      keyword: props.keyword ? props.keyword : '',
      timer: -1
    };
  }

  componentWillReceiveProps(nextProps) {
    const keyword = nextProps.keyword ? nextProps.keyword : '';
    this.setState({
      keyword
    });
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    this.clearTimer();

    // Execute searching
    const onSearch = this.props.onSearch;
    onSearch(this.state.keyword);
  }

  handleChange(e) {
    const keyword = e.target.value.substring(0, 20);

    this.clearTimer();
    const timer = setTimeout(() => {
      this.handleSubmit(null);
    }, 2000);

    this.setState({
      timer,
      keyword
    });
  }

  clearTimer() {
    // Clear the timeout if exists
    if (this.state.timer > 0) {
      clearTimeout(this.state.timer);
      this.setState({
        timer: -1
      });
    }
  }

  render() {
    return (
      <div className="search-form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  keyword: PropTypes.string,
  onSearch: PropTypes.func.isRequired
};

export default SearchForm;
