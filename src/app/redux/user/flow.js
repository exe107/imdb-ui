// @flow
import type { Action } from 'redux';

export type UserPersonalDetails = {
  name: string,
  surname: string,
};

export type UserCredentials = {
  username: string,
  password: string,
};

export type SaveUserAction = Action & {
  user: UserPersonalDetails,
};

export type ClearUserAction = Action;

export type UserState = {
  user: UserPersonalDetails,
};
