// @flow
import type { Action } from 'redux';
import type { User, UserState } from 'app/redux/user/flow';
import type { SpinnerState } from 'app/redux/spinner/flow';
import type { ErrorsState } from 'app/redux/errors/flow';
import type { MoviesOfTheDayState } from 'app/redux/movies-of-the-day/flow';

export type InitializationData = {
  user: User,
  movieIdsForToday: string[],
};

export type InitializationDataAction = Action & {
  initializationData: InitializationData,
};

export type State = SpinnerState &
  ErrorsState &
  UserState &
  MoviesOfTheDayState;
