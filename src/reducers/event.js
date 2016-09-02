import {
  EVENT_ITEM_LOAD,
  EVENT_ITEM_UNLOAD,
  EVENT_ITEM_CREATE,
  EVENT_ITEM_UPDATE
} from '../actions/event';

const initialState = {
  item: {
    date: 0,
    flag: 0,
    id: null,
    month: 0,
    number: 0,
    recurrence: 0,
    tag: 'default',
    text: '',
    timestamp: -1,
    year: 0
  },
  message: ''
};

const handlers = {
  [EVENT_ITEM_LOAD]: (state, action) => ({
    item: action.item
  }),

  [EVENT_ITEM_UNLOAD]: () => ({
    ...initialState
  }),

  [EVENT_ITEM_CREATE]: (state, action) => ({
    item: { ...action.item },
    message: 'Item created'
  }),

  [EVENT_ITEM_UPDATE]: (state, action) => ({
    item: { ...action.item },
    message: 'Item updated'
  })
};

export default function events(state = initialState, action) {
  const handler = handlers[action.type];
  if (!handler) return state;
  return {
    ...state,
    ...handler(state, action)
  };
}
