import api from '../api';

export const ANNUAL_DATA_LOAD = 'ANNUAL_DATA_LOAD';
export const CACHED_DATA_UNLOAD = 'CACHED_DATA_UNLOAD';
export const ACTIVE_SET = 'ACTIVE_SET';
export const SEARCH_RESULT_LOAD = 'SEARCH_RESULT_LOAD';

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

export function unloadCachedData() {
  return (dispatch) => {
    dispatch({
      type: CACHED_DATA_UNLOAD
    });
  };
}

function receiveSearchResult(keyword, payload) {
  return {
    type: SEARCH_RESULT_LOAD,
    keyword,
    payload
  };
}

export function search(keyword) {
  return (dispatch) => {
    // set the status as searching
    dispatch(receiveSearchResult(null));

    const callback = (payload) => {
      // save the search result into the store
      dispatch(receiveSearchResult(keyword, payload));
    };
    dispatch(api.searchEvents(keyword, callback));
  };
}

export function clearSearch() {
  // clear the search results
  return receiveSearchResult('', []);
}
