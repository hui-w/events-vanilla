import React, { PropTypes } from 'react';
import FlagLabel from '../../components/common/FlagLabel';
import { getWeekday } from '../../util';
import '../../styles/event-row.css';

const EventRow = ({ year, month, date, item, onItemClick }) => {
	// event number
	let numberDOM = item.number !== 0 ? <div className="event-number">
		{ item.number }
	</div> : ' ';

	// event tag
	let tagDOM = item.tag.length > 0 && <span>
		{' '} | <span className="key">Tag:</span> <span className="value">{item.tag}</span>
	</span>;

	return (
		<div className="event-row" onClick={onItemClick}>
			<div className="event-row-1">
				<FlagLabel flagIndex={item.flag} />
				<div className="event-text">{ item.text }</div>
				{ numberDOM }
			</div>
			<div className="event-row-2">
				<div className="event-subline">
					<span className="value">{ `${getWeekday(year, month, date, false)}, ${year}-${month}-${date}` }</span>
					{ tagDOM }
				</div>
				<div className="event-tool" />
			</div>
		</div>
	);
};

EventRow.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	date: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	onItemClick: PropTypes.func.isRequired
};

export default EventRow;
