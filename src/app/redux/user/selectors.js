// @flow
import _get from 'lodash/get';
import type { State } from 'app/redux/flow';
import type { User, UserMovieRating } from 'app/redux/user/flow';

export const getUser = (state: State): User => state.user;

export const getMovieRatings = (state: State): ?(UserMovieRating[]) =>
  _get(getUser(state), 'movieRatings');
