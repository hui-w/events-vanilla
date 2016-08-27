import React, { PropTypes } from 'react';
import { getMonthName } from '../../util';
import '../../styles/calendar-navigator.css';

const CalendarNavigator = ({ activeYear, activeMonth, onMonthShift }) => (
	<div className="calendar-navigator">
		<div className="month-navi-button previous-month no-select" onClick={() => onMonthShift(-1)}>&lt;&lt; Prev</div>
		<div className="current-month no-select">
			{getMonthName(activeMonth, false)}, {activeYear}
		</div>
		<div className="month-navi-button next-month no-select" onClick={() => onMonthShift(1)}>Next &gt;&gt;</div>
	</div>
);

CalendarNavigator.propTypes = {
	activeYear: PropTypes.number.isRequired,
	activeMonth: PropTypes.number.isRequired,
	onMonthShift: PropTypes.func.isRequired
};

export default CalendarNavigator;
