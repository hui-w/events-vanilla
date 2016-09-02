import React, { Component, PropTypes } from 'react';
import { getMonthName } from '../../util';
import '../../styles/calendar-selector.css';

class CalendarSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expandingYear: 0
    };
  }

  isToday() {
    const {
      activeYear,
      activeMonth,
      activeDate
    } = this.props;
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    return currentYear === activeYear && currentMonth === activeMonth && activeDate === currentDate;
  }

  expandYear(year) {
    const newYear = this.state.expandingYear === year ? 0 : year;
    this.setState({
      expandingYear: newYear
    });
  }

  render() {
    const {
      years,
      months,
      onMonthSelect
    } = this.props;

    // for today button
    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();

    // year list
    const yearListDOM = (
      <div className="year-list">
        {years.map(year => {
          const className = year === this.state.expandingYear ? 'year-item selected' : 'year-item';
          return <div key={year} className={className} onClick={() => this.expandYear(year)}>{year}</div>;
        })}
        {!this.isToday() &&
          <span onClick={() => onMonthSelect(thisYear, thisMonth, thisDate)} className="today-button">Today</span>
        }
      </div>
    );

    // month list
    let expandingMonths = [];
    if (this.state.expandingYear !== 0) {
      expandingMonths = months.filter(list => list.year === this.state.expandingYear);
    }
    const monthListDOM = this.state.expandingYear !== 0 &&
      <div className="month-list clearfix no-select">
        {expandingMonths.map(month =>
          <div
            key={month.month} className="month-item"
            onClick={() => onMonthSelect(month.year, month.month, null)}
          >
              { `${getMonthName(month.month)} (${month.count})` }
          </div>
        )}
      </div>;

    return (
      <div className="calendar-selector">
        {yearListDOM}
        {monthListDOM}
      </div>
    );
  }
}

CalendarSelector.propTypes = {
  years: PropTypes.array.isRequired,
  months: PropTypes.array.isRequired,
  activeYear: PropTypes.number.isRequired,
  activeMonth: PropTypes.number.isRequired,
  activeDate: PropTypes.number.isRequired,
  onMonthSelect: PropTypes.func.isRequired
};

export default CalendarSelector;
