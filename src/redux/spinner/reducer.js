import { HIDE_SPINNER, SHOW_SPINNER } from "./actions";

export const spinnerReducer = (state = 0, action) =>
  state +
  (action.type === SHOW_SPINNER ? 1 : action.type === HIDE_SPINNER ? -1 : 0);
