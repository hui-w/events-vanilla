import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Config from '../../config';
import '../../styles/calendar-month.css';

export default class CalendarMonth extends Component {
  constructor(props, context) {
    super(props, context);

    this.gotoDate = this.gotoDate.bind(this);
  }

  getFlagColor(flag) {
    return Config.FlagColors[flag % Config.FlagColors.length];
  }

  // get the days count of the month
  getDaysCount(year, month) {
    const totalDays = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month !== 2) {
      return totalDays[month - 1];
    }

    if (((year % 100 !== 0) && (year % 4 === 0)) || (year % 400 === 0)) {
      return 29;
    }

    return 28;
  }

  gotoDate(newDate) {
    const {
      year,
      month,
      date
    } = this.props;

    if (newDate === date) {
      browserHistory.push(`/calendar/${year}/${month}`);
    } else {
      browserHistory.push(`/calendar/${year}/${month}/${newDate}`);
    }
  }

  prepareData(year, month, date, events) {
    const data = {
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weeks: []
    };

    const firstDate = new Date();
    firstDate.setFullYear(year, month - 1, 1);
    let currentDayOfWeek = firstDate.getDay();

    // the first week
    data.weeks.push([]);

    // padding start
    let i;
    for (i = 0; i < currentDayOfWeek; i++) {
      data.weeks[data.weeks.length - 1].push({
        number: 0,
        events: []
      });
    }

    // current month
    const dayCount = this.getDaysCount(year, month);
    for (i = 0; i < dayCount; i++) {
      data.weeks[data.weeks.length - 1].push({
        number: i + 1,
        events: []
      });

      // get next day of week
      if (currentDayOfWeek === 6) {
        currentDayOfWeek = 0;

        // prepare for the next week
        if (i + 1 < dayCount) {
          data.weeks.push([]);
        }
      } else {
        currentDayOfWeek++;
      }
    }

    // padding end
    if (currentDayOfWeek !== 0) {
      for (i = 0; i < 7 - currentDayOfWeek; i++) {
        data.weeks[data.weeks.length - 1].push({
          number: 0,
          events: []
        });
      }
    }

    // attach events with day
    const dayPadding = firstDate.getDay();
    for (i = 0; i < events.length; i++) {
      const event = events[i];
      const dateIndex = (dayPadding + event.date) - 1;
      const weekIndex = Math.floor(dateIndex / 7);
      const dayIndex = dateIndex % 7;
      data.weeks[weekIndex][dayIndex].events.push(event);
    }

    return data;
  }

  render() {
    const {
      year,
      month,
      date,
      events
    } = this.props;
    const data = this.prepareData(year, month, date, events);

    const headerDOM = data.weekdays.map((weekday, index) => {
      if (index === 6 || index === 0) {
        return <th key={index} className="header-weekend">{weekday}</th>;
      }

      return <th key={index} className="header-weekday">{weekday}</th>;
    });

    const bodyDOM = data.weeks.map((week, weekIndex) =>
      <tr key={weekIndex}>
      {week.map((dateInfo, dateIndex) =>
        <td key={dateIndex} className={dateIndex === 6 || dateIndex === 0 ? 'cell-weekend' : 'cell-weekday'}>
        {dateInfo.number > 0 &&
          <div
            className={dateInfo.number === date ? 'date-info date-info-selected' : 'date-info'}
            onClick={() => this.gotoDate(dateInfo.number)}
          >
            <div className="cell-date">{dateInfo.number}</div>
            <div className="cell-pins clearfix">
              {dateInfo.events.map((event, eventIndex) =>
                <div
                  key={eventIndex} className="cell-pin" title={event.text}
                  style={{ backgroundColor: this.getFlagColor(event.flag) }}
                />
              )}
            </div>
          </div>
        }
        </td>
      )}
      </tr>
    );

    return (
      <div className="calendar-month">
        <table style={{ width: '100%' }} cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              { headerDOM }
            </tr>
          </thead>
          <tbody>
          { bodyDOM }
          </tbody>
        </table>
      </div>);
  }
}

CalendarMonth.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired
};
