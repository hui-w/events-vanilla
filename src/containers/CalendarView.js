import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SubMenu from '../components/common/SubMenu';
import BusyIcon from '../components/common/BusyIcon';
import CalendarSelector from '../components/calendar/CalendarSelector';
import CalendarNavigator from '../components/calendar/CalendarNavigator';
import CalendarMonth from '../components/calendar/CalendarMonth';
import CalendarList from '../components/calendar/CalendarList';

import { setActiveValue } from '../actions/events';
import { updatePreviousView } from '../actions/common';
import { filterList } from '../util';
import '../styles/calendar-view.css';

class CalendarView extends Component {
	constructor() {
		super();

		this.goToDate = this.goToDate.bind(this);
		this.shiftMonth = this.shiftMonth.bind(this);
		this.onItemClick = this.onItemClick.bind(this);

		this.state = {
			loading: false
		};
	}

	componentDidMount() {
		this.setActiveDate(this.props.params.year,
			this.props.params.month,
			this.props.params.date
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			this.setActiveDate(nextProps.params.year,
				nextProps.params.month,
				nextProps.params.date
			);
		} else if (nextProps.events) {
			this.setState({
				loading: false
			});
		}
	}

	componentWillUnmount() {
		const {
			activeYear,
			activeMonth
		} = this.props;
		this.props.dispatch(
			updatePreviousView(`Month ${activeYear}-${activeMonth}`, this.props.location.pathname)
		);
	}

	onItemClick(id) {
		browserHistory.push(`/event/${id}`);
	}

	setActiveDate(year, month, date) {
		this.setState({
			loading: true
		});

		// get the current year and month
		const today = new Date();
		const y = year ? parseInt(year, 10) : today.getFullYear();
		const m = month ? parseInt(month, 10) : today.getMonth() + 1;
		const d = date ? parseInt(date, 10) : 0; // today.getDate();

		// dispatch the action
		this.props.dispatch(setActiveValue(y, m, d));
	}

	goToDate(year, month, date) {
		let url = '/calendar';
		if (year) {
			url += `/${year}`;
			if (month) {
				url += `/${month}`;
				if (date) {
					url += `/${date}`;
				}
			}
		}

		browserHistory.push(url);
	}

	shiftMonth(monthCount) {
		let year = this.props.activeYear;
		let month = this.props.activeMonth;

		if (monthCount > 0 && month === 12) {
			// next year
			month = 1;
			year++;
		} else if (monthCount < 0 && month === 1) {
			// previous year
			month = 12;
			year--;
		} else {
			// next or previous month
			month += monthCount > 0 ? 1 : -1;
		}

		this.goToDate(year, month);
	}

	render() {
		const {
			events,
			years,
			months,
			activeYear,
			activeMonth,
			activeDate
		} = this.props;

		// calendar selector
		const calendarSelector = (!this.state.loading &&
			<CalendarSelector
				years={years} months={months}
				activeYear={activeYear} activeMonth={activeMonth} activeDate={activeDate}
				onMonthSelect={(year, month, date) => this.goToDate(year, month, date)}
			/>
		);

		// year month nav
		const calendarNavigator = (
			<CalendarNavigator
				activeYear={activeYear} activeMonth={activeMonth}
				onMonthShift={(value) => this.shiftMonth(value)}
			/>
		);

		// calendar body
		const calendarMonth = (
			<CalendarMonth
				year={activeYear} month={activeMonth} date={activeDate}
				events={events}
			/>
		);

		// events list
		let selectedEvents;
		if (activeDate > 0) {
			selectedEvents = events.filter(item => item.date === activeDate);
		} else {
			selectedEvents = events.sort((a, b) => a.date - b.date);
		}
		const calendarList = (
			<CalendarList
				events={selectedEvents} onItemClick={(id) => this.onItemClick(id)}
			/>
		);

		return (
			<div>
				<SubMenu>
					{calendarSelector}
				</SubMenu>
				<div className="monthly-view">
					{this.state.loading ? <div style={{ margin: '15px 10px' }}><BusyIcon /></div> :
						<div>
							{calendarNavigator}
							{calendarMonth}
							{calendarList}
						</div>
					}
				</div>
			</div>
		);
	}
}

CalendarView.propTypes = {
	events: PropTypes.array,
	years: PropTypes.array,
	months: PropTypes.array,
	activeYear: PropTypes.number,
	activeMonth: PropTypes.number,
	activeDate: PropTypes.number,
	previousView: PropTypes.object,
	location: PropTypes.object,
	dispatch: PropTypes.func,
	params: PropTypes.object
};

const selectEvents = (lists, year, month) => {
	let events = [];

	if (lists && lists[year]) {
		events = lists[year];
	}

	return events.filter(item => item.month === month);
};

const mapStateToProps = (state) => {
	const selectedEvents = selectEvents(state.events.annualEvents,
		state.events.activeYear,
		state.events.activeMonth
	);
	const events = filterList(selectedEvents, state.common.filters);
	return {
		events,
		years: state.events.years,
		months: state.events.months,
		activeYear: state.events.activeYear,
		activeMonth: state.events.activeMonth,
		activeDate: state.events.activeDate
	};
};

export default connect(
	mapStateToProps
)(CalendarView);
