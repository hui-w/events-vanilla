import React, { PropTypes } from 'react';
import EventRow from '../../components/common/EventRow';
import '../../styles/calendar-list.css';

const CalendarList = ({ events, onItemClick }) => (
	<div className="calendar-list">
		<div className="monthly-header">{events.length} Event(s)</div>
			{events.map((eventItem, index) =>
				<div key={index} className="monthly-item clearfix">
					<EventRow
						year={eventItem.year} month={eventItem.month} date={eventItem.date}
						item={eventItem} onItemClick={() => onItemClick(eventItem.id)}
					/>
				</div>
			)}
	</div>
);

CalendarList.propTypes = {
	events: PropTypes.array.isRequired,
	onItemClick: PropTypes.func.isRequired
};

export default CalendarList;
