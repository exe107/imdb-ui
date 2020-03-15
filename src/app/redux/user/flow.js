// @flow
import type { Action } from 'redux';
import type { ExistingReview } from 'app/pages/movie/reviews/flow';

export type UserPersonalDetails = {
  name: string,
  surname: string,
  email: string,
};

export type UserCredentials = {
  username: string,
  password: string,
};

export type UserMovie = {
  id: string,
  name: string,
  year: number,
  genres: string[],
  imageUrl: string,
  rating: ?number,
  runtime: ?number,
};

export type UserMovieIdentifier = {
  username: string,
  movieId: string,
};

export type UserMovieRating = {
  movie: UserMovie,
  rating: number,
  date?: string,
};

export type User = {
  username: string,
  admin: boolean,
  personalDetails: UserPersonalDetails,
  movieRatings: UserMovieRating[],
  watchlist: UserMovie[],
  pendingReviews: ExistingReview[],
};

export type PasswordChangeDetails = {
  oldPassword: string,
  newPassword: string,
};

export type SaveUserAction = Action & {
  user: User,
};

export type SaveRatingAction = Action & {
  movieRating: UserMovieRating,
};

export type UpdateRatingAction = Action & {
  movieRating: UserMovieRating,
};

export type DeleteRatingAction = Action & {
  movieId: string,
};

export type SaveWatchlistMovieAction = Action & {
  movie: UserMovie,
};

export type DeleteWatchlistMovieAction = Action & {
  movieId: string,
};

export type SavePendingReviewAction = Action & {
  review: ExistingReview,
};

export type DeletePendingReviewAction = Action & {
  identifier: UserMovieIdentifier,
};

export type UserState = {
  user: User,
};
