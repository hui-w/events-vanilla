import React, { PropTypes } from 'react';
import DateBox from '../../components/list/DateBox';
import { getMonthName } from '../../util';

const MonthBox = ({ year, item, onItemClick }) => {
  const dailyList = item.dates;

  // the list of days of this month
  const dailyListDOM = dailyList.map((dailyData, index) =>
    <DateBox key={index} year={year} month={item.month} item={dailyData} onItemClick={onItemClick} />
  );

  return (
    <div className="month-box">
      <div className="month-title">
        { getMonthName(item.month, true) }, { item.year }
      </div>
      <div className="date-list">
        { dailyListDOM }
      </div>
    </div>
  );
};

MonthBox.propTypes = {
  year: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default MonthBox;
