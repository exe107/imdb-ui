// @flow
import { HIDE_SPINNER, SHOW_SPINNER } from 'redux-config/spinner/actions';
import type { Action } from 'redux';

export const spinnerReducer = (state: number = 0, action: Action): number => {
  const { type } = action;

  if (type === SHOW_SPINNER) {
    return state + 1;
  }

  if (type === HIDE_SPINNER) {
    return state - 1;
  }

  return state;
};
