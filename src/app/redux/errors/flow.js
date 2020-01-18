// @flow
import { Action } from 'redux';

export type ApiError = {
  id: string,
  message: string,
};

export type AddErrorAction = Action & {
  error: ApiError,
};

export type ClearErrorsAction = Action;

export type ErrorsState = {
  errors: ApiError[],
};
