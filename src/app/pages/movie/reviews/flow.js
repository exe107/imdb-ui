// @flow
import type { UserMovie, UserMovieIdentifier } from 'app/redux/user/flow';

export type NewReview = {
  movie: UserMovie,
  review: string,
};

export type ExistingReview = UserMovieIdentifier & {
  review: string,
  movie: string,
  date: string,
};
