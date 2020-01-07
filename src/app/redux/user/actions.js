// @flow
import type {
  ClearUserAction,
  SaveUserAction,
  UserPersonalDetails,
} from 'app/redux/user/flow';

export const SAVE_USER = 'SAVE_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const saveUser = (user: UserPersonalDetails): SaveUserAction => ({
  type: SAVE_USER,
  user,
});

export const clearUser = (): ClearUserAction => ({ type: CLEAR_USER });
