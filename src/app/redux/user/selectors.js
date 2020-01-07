// @flow
import type { State } from 'app/redux/flow';
import type { UserPersonalDetails } from 'app/redux/user/flow';

export const getUser = (state: State): UserPersonalDetails => state.user;
