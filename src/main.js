import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import 'babel-polyfill';

import * as reducers from './reducers';
import { App } from './components';
import { ListView, CalendarView, SearchView, ItemView, SettingsView } from './containers';

const middleware = [thunk];

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={ListView} />
          <Route path="list" component={ListView}>
            <Route path=":year" component={ListView} />
          </Route>
          <Route path="calendar" component={CalendarView}>
            <Route path=":year/:month" component={ListView} />
            <Route path=":year/:month/:date" component={ListView} />
          </Route>
          <Route path="event" component={ItemView}>
            <Route path=":id" component={ItemView} />
          </Route>
          <Route path="search" component={SearchView}>
            <Route path=":keyword" component={ItemView} />
          </Route>
          <Route path="settings" component={SettingsView} />
        </Route>
      </Router>
    </Provider>
    {process.env.NODE_ENV === 'development' && <div className="dev-tool">
      <span onClick={() => console.log(store.getState())}>Log State</span>
    </div>}
  </div>,
  document.getElementById('root')
);
