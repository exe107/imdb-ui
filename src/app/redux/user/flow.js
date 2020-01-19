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
  imageUrl: string,
  rating: number,
};

export type UserMovieRating = {
  movie: UserMovie,
  rating: number,
};

export type User = {
  personalDetails: UserPersonalDetails,
  movieRatings: UserMovieRating[],
};

export type SaveUserAction = Action & {
  user: User,
};

export type ClearUserAction = Action;

export type UserState = {
  user: User,
};
