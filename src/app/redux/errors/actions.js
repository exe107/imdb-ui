// @flow
import _uniqueId from 'lodash/uniqueId';
import type { AddErrorAction, ClearErrorsAction } from 'app/redux/errors/flow';

export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const addError = (message: string): AddErrorAction => ({
  type: ADD_ERROR,
  error: { id: _uniqueId('error'), message },
});

export const clearErrors = (): ClearErrorsAction => ({ type: CLEAR_ERRORS });
