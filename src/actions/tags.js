import api from '../api';

export const TAG_LIST_LOAD = 'TAG_LIST_LOAD';
export const TAG_LIST_UNLOAD = 'TAG_LIST_UNLOAD';

export function loadTags() {
	// return (dispatch, getState) => {
	return (dispatch) => {
		const callback = (payload) => {
			// save the data payload into the store
			dispatch({
				type: TAG_LIST_LOAD,
				...payload
			});
		};
		dispatch(api.getTags(callback));
	};
}

export function unloadTags() {
	// return function(dispatch, getState) {
	return (dispatch) => {
		dispatch({
			type: TAG_LIST_UNLOAD
		});
	};
}
