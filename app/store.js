import { createStore, combineReducers } from 'redux';
import appReducer from './reducer';
import navReducer from './navigation/reducer';

const reducers = combineReducers({
  nav: navReducer,
  app: appReducer,
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export default store;
