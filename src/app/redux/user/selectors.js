// @flow
import type { State } from 'app/redux/flow';
import type { User } from 'app/redux/user/flow';

export const getUser = (state: State): User => state.user;
