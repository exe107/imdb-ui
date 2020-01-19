// @flow
import type {
  ClearUserAction,
  SaveUserAction,
  User,
  UserMovieRating,
  RateMovieAction,
  SaveRatingAction,
  UpdateRatingAction,
  DeleteRatingAction,
  RemoveRatingAction,
} from 'app/redux/user/flow';

export const SAVE_USER = 'SAVE_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const RATE_MOVIE = 'RATE_MOVIE';
export const SAVE_RATING = 'SAVE_RATING';
export const UPDATE_RATING = 'UPDATE_RATING';
export const DELETE_RATING = 'DELETE_RATING';
export const REMOVE_RATING = 'REMOVE_RATING';

export const saveUser = (user: User): SaveUserAction => ({
  type: SAVE_USER,
  user,
});

export const clearUser = (): ClearUserAction => ({ type: CLEAR_USER });

export const rateMovie = (
  movieRating: UserMovieRating,
  isNewRating: boolean,
): RateMovieAction => ({
  type: RATE_MOVIE,
  movieRating,
  isNewRating,
});

export const deleteRating = (movieId: string): DeleteRatingAction => ({
  type: DELETE_RATING,
  movieId,
});

export const saveRating = (movieRating: UserMovieRating): SaveRatingAction => ({
  type: SAVE_RATING,
  movieRating,
});

export const updateRating = (
  movieRating: UserMovieRating,
): UpdateRatingAction => ({
  type: UPDATE_RATING,
  movieRating,
});

export const removeRating = (movieId: string): RemoveRatingAction => ({
  type: REMOVE_RATING,
  movieId,
});
