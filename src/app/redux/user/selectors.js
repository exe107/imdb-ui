// @flow
import type { State } from 'app/redux/flow';
import type { User, UserMovieRating } from 'app/redux/user/flow';

export const getUser = (state: State): User => state.user;

export const getUserRatedMovies = (state: State): UserMovieRating[] =>
  getUser(state).movieRatings;
