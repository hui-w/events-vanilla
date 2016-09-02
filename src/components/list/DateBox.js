import React, { PropTypes } from 'react';
import EventRow from '../../components/common/EventRow';
import { getWeekday } from '../../util';

const DateBox = ({ year, month, item, onItemClick }) => {
  const eventList = item.events;

  // the list of daily events
  const eventListDOM = eventList.map((eventItem, index) =>
    <EventRow
      key={index}
      year={year}
      month={month}
      date={item.date}
      item={eventItem}
      onItemClick={() => onItemClick(eventItem.id)}
    />
  );

  return (
    <div className="date-box">
      <div className="date-title">
        <div className="date">{ item.date }</div>
        <div className="weekday">{ getWeekday(year, month, item.date) }</div>
      </div>
      <div className="event-list">
        { eventListDOM }
      </div>
    </div>
  );
};

DateBox.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default DateBox;
