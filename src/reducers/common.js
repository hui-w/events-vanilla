import { LOCATION_CHANGE } from 'react-router-redux';

import {
  PREVIOUS_VIEW_UPDATE,
  PREVIOUS_VIEW_RESET,
  FILTERS_UPDATE,
  FILTERS_RESET
} from '../actions/common';

const initialState = {
  previousView: {},
  filters: {
    flags: [],
    tags: []
  }
};

const handlers = {
  [LOCATION_CHANGE]: (state) => ({
    ...state
  }),
  [PREVIOUS_VIEW_UPDATE]: (state, action) => ({
    previousView: {
      title: action.title,
      url: action.url
    }
  }),
  [PREVIOUS_VIEW_RESET]: () => ({
    previousView: {}
  }),
  [FILTERS_UPDATE]: (state, action) => ({
    filters: action.filters
  }),
  [FILTERS_RESET]: () => ({
    filters: {
      flags: [],
      tags: []
    }
  })
};

export default function events(state = initialState, action) {
  const handler = handlers[action.type];
  if (!handler) return state;
  return { ...state,
    ...handler(state, action)
  };
}
