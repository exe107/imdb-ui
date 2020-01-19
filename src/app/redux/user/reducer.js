// @flow
import { createReducer } from 'app/redux/util';
import { CLEAR_USER, SAVE_USER } from 'app/redux/user/actions';
import type { SaveUserAction, User } from 'app/redux/user/flow';

const saveUser = (state: User, action: SaveUserAction) => action.user;

const clearUser = () => null;

export default createReducer(
  { [SAVE_USER]: saveUser, [CLEAR_USER]: clearUser },
  null,
);
