// @flow
import { Action } from 'redux';
import { store } from 'app/redux/index';
import { hideSpinner, showSpinner } from 'app/redux/spinner/actions';

export function createReducer<T>(actionHandlers: Object, initialState: T) {
  return (state: T = initialState, action: Action) => {
    const { type } = action;
    const actionHandler = actionHandlers[type];

    return actionHandler ? actionHandler(state, action) : state;
  };
}

type AsyncFunction<T> = () => Promise<T>;

export const asyncOperation = async (asyncFn: AsyncFunction<any>): any => {
  const { dispatch } = store;

  dispatch(showSpinner());
  const result = await asyncFn();
  dispatch(hideSpinner());

  return result;
};
