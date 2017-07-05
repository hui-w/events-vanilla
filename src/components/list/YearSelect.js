import React, { Component } from 'react';
import PropTypes from 'prop-types';

class YearSelect extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectedYear: null
    };
  }

  handleChange(e) {
    const onChange = this.props.onChange;
    onChange(e.target.value);
    // this.setState({selectedYear: e.target.value});
  }

  render() {
    const yearList = this.props.yearList;

    // select options
    const options = yearList.map(year => (<option key={year}>{year}</option>));

    return (
      <select
        className="year-select"
        onChange={this.handleChange}
        value={this.state.selectedYear ? this.state.selectedYear : this.props.selectedYear}
      >
        {options}
      </select>
    );
  }
}

YearSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  yearList: PropTypes.array.isRequired,
  selectedYear: PropTypes.number.isRequired
};

export default YearSelect;
