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

export type UserMovie = {
  id: string,
  name: string,
  year: number,
  genres: string[],
  imageUrl: string,
  rating: ?number,
  runtime: ?number,
};

export type UserMovieRating = {
  movie: UserMovie,
  rating: number,
  date?: string,
};

export type User = {
  personalDetails: UserPersonalDetails,
  movieRatings: UserMovieRating[],
  watchlist: UserMovie[],
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

export type ClearUserAction = Action;

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

export type UserState = {
  user: User,
};
