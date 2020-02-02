// @flow
import type { UserMovie } from 'app/redux/user/flow';

export type NewComment = {
  movie: UserMovie,
  comment: string,
};

export type ExistingComment = {
  id: number,
  comment: string,
  username: string,
  date: string,
};
