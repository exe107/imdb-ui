// @flow
import { createReducer } from 'app/redux/util';
import { ADD_ERROR, CLEAR_ERRORS } from 'app/redux/errors/actions';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';

const addError = (state: ApiError[], action: AddErrorAction) => [
  ...state,
  action.error,
];

const clearErrors = () => [];

export default createReducer(
  {
    [ADD_ERROR]: addError,
    [CLEAR_ERRORS]: clearErrors,
  },
  [],
);
