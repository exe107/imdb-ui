// @flow
import { createReducer } from 'app/redux/util';
import { HIDE_SPINNER, SHOW_SPINNER } from 'app/redux/spinner/actions';

const showSpinner = (state: number) => state + 1;

const hideSpinner = (state: number) => state - 1;

export default createReducer(
  { [SHOW_SPINNER]: showSpinner, [HIDE_SPINNER]: hideSpinner },
  0,
);
