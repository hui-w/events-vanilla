import React, { PropTypes } from 'react';
import moment from 'moment';
import FlagLabel from '../../components/common/FlagLabel';
import { timestamp2String, getWeekday, getMonthName } from '../../util';
import '../../styles/event-item.css';

const EventItem = ({ item }) => {
  // event number
  const numberDOM = item.number !== 0 &&
    <div className="item-row">
      Number:
      <div className="event-number">
        { item.number }
      </div>
    </div>;

  // event tag
  const tagDOM = item.tag.length > 0 &&
    <div className="item-row">
      <span className="key">Tag:</span> <span className="value">{item.tag}</span>
    </div>;

  return (
    <div className="event-item">
      <div className="item-row">
        <FlagLabel flagIndex={item.flag} />
        <div className="event-date">
          {getWeekday(item.year, item.month, item.date, true)}
          {`, ${getMonthName(item.month, true)} ${item.date}, ${item.year}`}
        </div>
      </div>
      <div className="item-row">
        <div className="event-text">{item.text}</div>
      </div>
      { numberDOM }
      { tagDOM }
      <div className="item-row">
        <div className="update-time" title={timestamp2String(item.timestamp)}>
          Updated { moment(timestamp2String(item.timestamp), 'YYYY-M-D').fromNow() }
        </div>
      </div>
    </div>
  );
};

EventItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default EventItem;
