import {
	SEARCH_RESULTS_LOAD
} from '../actions/search';

const initialState = {
	results: []
};

const handlers = {
	[SEARCH_RESULTS_LOAD]: (state, action) => ({
		...state,
		results: action.results
	})
};

export default function events(state = initialState, action) {
	const handler = handlers[action.type];
	if (!handler) return state;
	return { ...state,
		...handler(state, action)
	};
}
