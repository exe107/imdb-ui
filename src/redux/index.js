import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { spinnerReducer } from "./spinner/reducer";
import { history } from "./history";

const reducer = combineReducers({
  router: connectRouter(history),
  spinner: spinnerReducer
});

export const store = createStore(reducer, composeWithDevTools());
