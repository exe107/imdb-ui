// @flow
import _get from 'lodash/get';
import type { State } from 'app/redux/flow';
import type { User, UserMovie, UserMovieRating } from 'app/redux/user/flow';
import type { PendingReview } from 'app/pages/movie/reviews/flow';

export const getUser = (state: State): User => state.user;

export const getMovieRatings = (state: State): ?(UserMovieRating[]) =>
  _get(getUser(state), 'movieRatings');

export const getWatchlist = (state: State): ?(UserMovie[]) =>
  _get(getUser(state), 'watchlist');

export const getPendingReviews = (state: State): ?(PendingReview[]) =>
  _get(getUser(state), 'pendingReviews');
