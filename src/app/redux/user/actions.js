// @flow
import type {
  SaveUserAction,
  User,
  UserMovieRating,
  SaveRatingAction,
  UpdateRatingAction,
  DeleteRatingAction,
  UserMovie,
  SaveWatchlistMovieAction,
  DeleteWatchlistMovieAction,
  SavePendingReviewAction,
  UserMovieIdentifier,
  DeletePendingReviewAction,
} from 'app/redux/user/flow';
import type { ExistingReview } from 'app/pages/movie/reviews/flow';

export const SAVE_USER = 'SAVE_USER';

export const SAVE_RATING = 'SAVE_RATING';
export const UPDATE_RATING = 'UPDATE_RATING';
export const DELETE_RATING = 'DELETE_RATING';

export const WATCHLIST_SAVE_MOVIE = 'WATCHLIST_SAVE_MOVIE';
export const WATCHLIST_DELETE_MOVIE = 'WATCHLIST_DELETE_MOVIE';

export const SAVE_PENDING_REVIEW = 'SAVE_PENDING_REVIEW';
export const DELETE_PENDING_REVIEW = 'DELETE_PENDING_REVIEW';

export const saveUserAction = (user: User): SaveUserAction => ({
  type: SAVE_USER,
  user,
});

export const saveRatingAction = (
  movieRating: UserMovieRating,
): SaveRatingAction => ({
  type: SAVE_RATING,
  movieRating,
});

export const updateRatingAction = (
  movieRating: UserMovieRating,
): UpdateRatingAction => ({
  type: UPDATE_RATING,
  movieRating,
});

export const deleteRatingAction = (movieId: string): DeleteRatingAction => ({
  type: DELETE_RATING,
  movieId,
});

export const saveWatchlistMovieAction = (
  movie: UserMovie,
): SaveWatchlistMovieAction => ({
  type: WATCHLIST_SAVE_MOVIE,
  movie,
});

export const deleteWatchlistMovieAction = (
  movieId: string,
): DeleteWatchlistMovieAction => ({
  type: WATCHLIST_DELETE_MOVIE,
  movieId,
});

export const savePendingReviewAction = (
  review: ExistingReview,
): SavePendingReviewAction => ({
  type: SAVE_PENDING_REVIEW,
  review,
});

export const deletePendingReviewAction = (
  identifier: UserMovieIdentifier,
): DeletePendingReviewAction => ({
  type: DELETE_PENDING_REVIEW,
  identifier,
});
