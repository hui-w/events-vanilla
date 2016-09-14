import update from 'react/lib/update';

import {
  ANNUAL_DATA_LOAD,
  ACTIVE_SET,
  CACHED_DATA_UNLOAD,
  SEARCH_RESULT_LOAD
} from '../actions/events';

const initialState = {
  activeYear: 0,
  activeMonth: 0,
  activeDate: 0,
  years: [],
  months: [],
  annualEvents: {},
  tags: [],
  searchResults: []
};

const handlers = {
  [ACTIVE_SET]: (state, action) => ({
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
  [CACHED_DATA_UNLOAD]: () => ({
    ...initialState
  }),
  [SEARCH_RESULT_LOAD]: (state, action) => ({
    searchResults: action.payload
  })
};

export default function events(state = initialState, action) {
  const handler = handlers[action.type];
  if (!handler) return state;
  return { ...state,
    ...handler(state, action)
  };
}
