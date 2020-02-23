// @flow
import type { Action } from 'redux';
import type { ExistingReview } from 'app/pages/movie/reviews/flow';

export type UserPersonalDetails = {
  name: string,
  surname: string,
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

export type RegisterUserAction = Action & {
  userDetails: UserPersonalDetails & UserCredentials,
};

export type LogInUserAction = Action & {
  userCredentials: UserCredentials,
};

export type SaveUserAction = Action & {
  user: User,
};

export type ChangePasswordAction = Action & {
  passwordChangeDetails: PasswordChangeDetails,
};

export type RateMovieAction = Action & {
  movieRating: UserMovieRating,
  isNewRating: boolean,
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

export type RemoveRatingAction = Action & {
  movieId: string,
};

export type AddWatchlistMovieAction = Action & {
  movie: UserMovie,
};

export type SaveWatchlistMovieAction = Action & {
  movie: UserMovie,
};

export type RemoveWatchlistMovieAction = Action & {
  movieId: string,
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
