// @flow
import { Action } from 'redux';

export function createReducer<T>(actionHandlers: Object, initialState: T) {
  return (state: T = initialState, action: Action) => {
    const { type } = action;
    const actionHandler = actionHandlers[type];

    return actionHandler ? actionHandler(state, action) : state;
  };
}
