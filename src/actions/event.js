import api from '../api';

export const EVENT_ITEM_LOAD = 'EVENT_ITEM_LOAD';
export const EVENT_ITEM_UNLOAD = 'EVENT_ITEM_UNLOAD';

export const EVENT_ITEM_CREATE = 'EVENT_ITEM_CREATE';
export const EVENT_ITEM_UPDATE = 'EVENT_ITEM_UPDATE';
export const EVENT_ITEM_DELETE = 'EVENT_ITEM_DELETE';

function searchItem(annualEvents, id) {
	/* eslint-disable */
	for (const year in annualEvents) {
		for (let i = 0; i < annualEvents[year].length; i++) {
			const item = annualEvents[year][i];
			if (item.id === id) {
				return item;
			}
		}
	}
	return null;
	/* eslint-disable */
}

// save the data payload into the store
function receiveEventItem(eventItem) {
	return {
		type: EVENT_ITEM_LOAD,
		item: eventItem
	};
}

export function loadEvent(id) {
	return (dispatch, getState) => {
		const annualEvents = getState().events.annualEvents;
		const item = searchItem(annualEvents, id);
		if (item != null) {
			// found in cache
			dispatch(receiveEventItem(item));
		} else {
			// load from server
			const callback = (eventItem) => {
				dispatch(receiveEventItem(eventItem));
			};
			dispatch(api.getEvent(id, callback));
		}
	};
}

export function unloadEvent() {
	return {
		type: EVENT_ITEM_UNLOAD
	};
}

export function createEvent(item, onComplete) {
	return (dispatch) => {
		const callback = (newItem) => {
			dispatch({
				type: EVENT_ITEM_CREATE,
				item: newItem
			});

			if (typeof onComplete === 'function') {
				onComplete();
			}
		};
		dispatch(api.createEvent(item, callback));
	};
}

export function updateEvent(item, onComplete) {
	return (dispatch) => {
		const callback = (newItem) => {
			dispatch({
				type: EVENT_ITEM_UPDATE,
				item: newItem
			});

			if (typeof onComplete === 'function') {
				onComplete();
			}
		};
		dispatch(api.updateEvent(item, callback));
	};
}

export function deleteEvent(id, onComplete) {
	return (dispatch) => {
		const callback = () => {
			dispatch({
				type: EVENT_ITEM_DELETE
			});

			if (typeof onComplete === 'function') {
				onComplete();
			}
		};
		dispatch(api.deleteEvent(id, callback));
	};
}
