import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import BusyIcon from '../../components/common/BusyIcon';
import FlagLabel from '../../components/common/FlagLabel';

import { timestamp2String, getWeekday, getMonthName } from '../../util';
import '../../styles/event-item.css';

export default class EventItem extends Component {
	onDelete(id) {
		/* eslint-disable */
		if (window.confirm('Are you sure to delete?')) {
			this.props.onDelete(id);
		}
		/* eslint-disable */
	}

	render() {
		const item = this.props.item;

		// action buttons
		let buttons;
		if (this.props.changing) {
			buttons = <BusyIcon />;
		} else {
			buttons = (
				<div>
					<button type="button" className="button" onClick={this.props.onModify}>Modify</button>
					<button type="button" className="button" onClick={() => this.onDelete(item.id)}>Delete</button>
				</div>
			);
		}

		// event number
		let numberDOM = item.number !== 0 &&
			<div className="item-row">
				Number:
				<div className="event-number">
					{ item.number }
				</div>
			</div>;

		// event tag
		let tagDOM = item.tag.length > 0 &&
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
				<div className="item-row">
					{buttons}
				</div>
			</div>
		);
	}
}

EventItem.propTypes = {
	item: PropTypes.object.isRequired,
	changing: PropTypes.bool.isRequired,
	onModify: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

