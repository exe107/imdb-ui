// @flow
import { createReducer } from 'app/redux/util';
import { CLEAR_USER, SAVE_USER } from 'app/redux/user/actions';
import type { SaveUserAction, UserPersonalDetails } from 'app/redux/user/flow';

const saveUser = (state: UserPersonalDetails, action: SaveUserAction) =>
  action.user;

const clearUser = () => null;

export default createReducer(
  { [SAVE_USER]: saveUser, [CLEAR_USER]: clearUser },
  null,
);
