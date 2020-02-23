// @flow
import { createStore, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { history } from 'app/redux/history';
import spinnerReducer from 'app/redux/spinner/reducer';
import errorsReducer from 'app/redux/errors/reducer';
import userReducer from 'app/redux/user/reducer';

const reducer = combineReducers({
  router: connectRouter(history),
  spinner: spinnerReducer,
  errors: errorsReducer,
  user: userReducer,
});

export const store = createStore(reducer, devToolsEnhancer());
