import update from 'react/lib/update';

import {
	ANNUAL_DATA_LOAD,
	ACTIVE_SET,
	ANNUAL_DATA_UNLOAD
} from '../actions/events';

const initialState = {
	activeYear: 0,
	activeMonth: 0,
	activeDate: 0,
	years: [],
	months: [],
	annualEvents: {},
	tags: []
};

const handlers = {
	[ACTIVE_SET]: (state, action) => ({
		...state,
		activeYear: action.year,
		activeMonth: action.month,
		activeDate: action.date
	}),
	[ANNUAL_DATA_LOAD]: (state, action) => {
		const {
			year,
			years,
			months
		} = action;
		const eventList = action.events;
		return update(state, {
			years: {
				$set: years
			},
			months: {
				$set: months
			},
			annualEvents: {
				[year]: {
					$set: eventList
				}
			}
		});
	},
	[ANNUAL_DATA_UNLOAD]: () => ({
		...initialState
	})
};

export default function events(state = initialState, action) {
	const handler = handlers[action.type];
	if (!handler) return state;
	return { ...state,
		...handler(state, action)
	};
}
