export const SEARCH_RESULTS_LOAD = 'SEARCH_RESULTS_LOAD';
export const SEARCH_RESULTS_CLEAR = 'SEARCH_RESULTS_CLEAR';

export function search() {
  return {
    type: SEARCH_RESULTS_LOAD
  };
}

export function clearSearch() {
  return {
    type: SEARCH_RESULTS_CLEAR
  };
}
