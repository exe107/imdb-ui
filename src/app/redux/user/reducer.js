// @flow
import _get from 'lodash/get';
import _isEqualWith from 'lodash/isEqualWith';
import { createReducer } from 'app/redux/util';
import {
  DELETE_PENDING_REVIEW,
  DELETE_RATING,
  SAVE_PENDING_REVIEW,
  SAVE_RATING,
  SAVE_USER,
  UPDATE_RATING,
  WATCHLIST_DELETE_MOVIE,
  WATCHLIST_SAVE_MOVIE,
} from 'app/redux/user/actions';
import type {
  DeletePendingReviewAction,
  DeleteRatingAction,
  DeleteWatchlistMovieAction,
  SavePendingReviewAction,
  SaveRatingAction,
  SaveUserAction,
  SaveWatchlistMovieAction,
  UpdateRatingAction,
  User,
  UserMovieRating,
} from 'app/redux/user/flow';
import { SAVE_INITIALIZATION_DATA } from 'app/redux/actions';
import type { InitializationDataAction } from 'app/redux/flow';

const saveInitializationDataUser = (
  state: User,
  { initializationData }: InitializationDataAction,
) => initializationData.user;

const saveUser = (state: User, action: SaveUserAction) => action.user;

const saveRating = (state: User, action: SaveRatingAction) => ({
  ...state,
  movieRatings: [...state.movieRatings, action.movieRating],
});

const updateRating = (state: User, action: UpdateRatingAction) => {
  const movieComparator = (
    firstRating: UserMovieRating,
    secondRating: UserMovieRating,
  ): boolean => {
    const movieIdPath = 'movie.id';
    return _get(firstRating, movieIdPath) === _get(secondRating, movieIdPath);
  };

  const movieRatings = state.movieRatings.map(movieRating =>
    _isEqualWith(movieRating, action.movieRating, movieComparator)
      ? action.movieRating
      : movieRating,
  );

  return { ...state, movieRatings };
};

const removeRating = (state: User, action: DeleteRatingAction) => ({
  ...state,
  movieRatings: state.movieRatings.filter(
    movieRating => movieRating.movie.id !== action.movieId,
  ),
});

const saveMovieToWatchlist = (
  state: User,
  action: SaveWatchlistMovieAction,
) => ({
  ...state,
  watchlist: [...state.watchlist, action.movie],
});

const deleteWatchlistMovie = (
  state: User,
  action: DeleteWatchlistMovieAction,
) => ({
  ...state,
  watchlist: state.watchlist.filter(movie => movie.id !== action.movieId),
});

const savePendingReview = (state: User, action: SavePendingReviewAction) => ({
  ...state,
  pendingReviews: [...state.pendingReviews, action.review],
});

const deletePendingReview = (
  state: User,
  action: DeletePendingReviewAction,
) => {
  const { movieId, username } = action.identifier;

  return {
    ...state,
    pendingReviews: state.pendingReviews.filter(
      review => review.movieId !== movieId || review.username !== username,
    ),
  };
};

export default createReducer(
  {
    [SAVE_INITIALIZATION_DATA]: saveInitializationDataUser,
    [SAVE_USER]: saveUser,
    [SAVE_RATING]: saveRating,
    [UPDATE_RATING]: updateRating,
    [DELETE_RATING]: removeRating,
    [WATCHLIST_SAVE_MOVIE]: saveMovieToWatchlist,
    [WATCHLIST_DELETE_MOVIE]: deleteWatchlistMovie,
    [SAVE_PENDING_REVIEW]: savePendingReview,
    [DELETE_PENDING_REVIEW]: deletePendingReview,
  },
  null,
);
