// @flow
import { createStore, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { spinnerReducer } from 'redux-config/spinner/reducer';
import { history } from 'redux-config/history';

const reducer = combineReducers({
  router: connectRouter(history),
  spinner: spinnerReducer,
});

export const store = createStore(reducer, composeWithDevTools());
