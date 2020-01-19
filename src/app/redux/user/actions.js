// @flow
import type {
  ClearUserAction,
  SaveUserAction,
  User,
} from 'app/redux/user/flow';

export const SAVE_USER = 'SAVE_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const saveUser = (user: User): SaveUserAction => ({
  type: SAVE_USER,
  user,
});

export const clearUser = (): ClearUserAction => ({ type: CLEAR_USER });
