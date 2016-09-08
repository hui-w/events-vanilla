import React, { Component, PropTypes } from 'react';

import '../../styles/search-form.css';

class SearchForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      keyword: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const onSearch = this.props.onSearch;
    onSearch(this.state.keyword);
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    });
  };

  render() {
    const onSearch = this.props.onSearch;
    return (
      <div className="search-form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.keyword} onChange={this.handleChange} />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchForm;
