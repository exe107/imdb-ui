// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from 'app/redux/saga';
import { history } from 'app/redux/history';
import spinnerReducer from 'app/redux/spinner/reducer';
import errorsReducer from 'app/redux/errors/reducer';
import userReducer from 'app/redux/user/reducer';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  router: connectRouter(history),
  spinner: spinnerReducer,
  errors: errorsReducer,
  user: userReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
