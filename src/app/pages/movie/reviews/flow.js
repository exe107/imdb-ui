// @flow
import type { UserMovie } from 'app/redux/user/flow';

export type NewReview = {
  movie: UserMovie,
  review: string,
};

type ExistingReview = {
  id: number,
  review: string,
  username: string,
  date: string,
};

export type ApprovedReview = ExistingReview;

export type PendingReview = ExistingReview & {
  movieId: string,
  movie: string,
};
