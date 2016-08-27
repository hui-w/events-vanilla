export const PREVIOUS_VIEW_UPDATE = 'PREVIOUS_VIEW_UPDATE';
export const PREVIOUS_VIEW_RESET = 'PREVIOUS_VIEW_RESET';
export const FILTERS_UPDATE = 'FILTERS_UPDATE';
export const FILTERS_RESET = 'FILTERS_RESET';

export function updatePreviousView(title, url) {
	return {
		type: PREVIOUS_VIEW_UPDATE,
		title,
		url
	};
}

export function updateFilters(filters) {
	// console.log(filters.flags, filters.tags);
	return {
		type: FILTERS_UPDATE,
		filters
	};
}

export function resetPreviousView() {
	return {
		type: PREVIOUS_VIEW_RESET
	};
}

export function resetFilters() {
	return {
		type: FILTERS_RESET
	};
}
