import api from '../api';

export const ANNUAL_DATA_LOAD = 'ANNUAL_DATA_LOAD';
export const ANNUAL_DATA_UNLOAD = 'ANNUAL_DATA_UNLOAD';
export const ACTIVE_SET = 'ACTIVE_SET';

function receiveAnnualData(year, payload) {
	return {
		type: ANNUAL_DATA_LOAD,
		year,
		...payload
	};
}

export function setActiveValue(year, month, date) {
	return (dispatch, getState) => {
		const currentState = getState();

		if (!currentState.events.annualEvents[year]) {
			// need to load from remote
			// before changing current year, load the data into the store
			const callback = (payload) => {
				// save the data payload into the store
				dispatch(receiveAnnualData(year, payload));

				dispatch({
					type: ACTIVE_SET,
					year,
					month,
					date
				});
			};
			dispatch(api.getEvents(year, callback));
		} else {
			// data is already in the store, change the year and month directly
			dispatch({
				type: ACTIVE_SET,
				year,
				month,
				date
			});
		}
	};
}

export function unloadAnnualData() {
	return (dispatch) => {
		dispatch({
			type: ANNUAL_DATA_UNLOAD
		});
	};
}