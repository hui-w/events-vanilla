import {
  TAG_LIST_LOAD,
  TAG_LIST_UNLOAD
} from '../actions/tags';

const initialState = {
  list: []
};

const handlers = {
  [TAG_LIST_LOAD]: (state, action) => ({
    ...state,
    list: action.tags
  }),
  [TAG_LIST_UNLOAD]: () => ({
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
