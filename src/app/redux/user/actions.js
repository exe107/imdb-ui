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
  UserCredentials,
  LogInUserAction,
  UserPersonalDetails,
  RegisterUserAction,
  UserMovie,
  AddWatchlistMovieAction,
  SaveWatchlistMovieAction,
  RemoveWatchlistMovieAction,
  DeleteWatchlistMovieAction,
  ChangePasswordAction,
  PasswordChangeDetails,
} from 'app/redux/user/flow';
import { Action } from 'redux';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const SAVE_USER = 'SAVE_USER';

export const LOGOUT_USER = 'LOGOUT_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const RATE_MOVIE = 'RATE_MOVIE';
export const SAVE_RATING = 'SAVE_RATING';
export const UPDATE_RATING = 'UPDATE_RATING';

export const DELETE_RATING = 'DELETE_RATING';
export const REMOVE_RATING = 'REMOVE_RATING';

export const WATCHLIST_ADD_MOVIE = 'WATCHLIST_ADD_MOVIE';
export const WATCHLIST_SAVE_MOVIE = 'WATCHLIST_SAVE_MOVIE';

export const WATCHLIST_REMOVE_MOVIE = 'WATCHLIST_REMOVE_MOVIE';
export const WATCHLIST_DELETE_MOVIE = 'WATCHLIST_DELETE_MOVIE';

export const registerUserAction = (
  userDetails: UserPersonalDetails & UserCredentials,
): RegisterUserAction => ({
  type: REGISTER_USER,
  userDetails,
});

export const logInUserAction = (
  userCredentials: UserCredentials,
): LogInUserAction => ({
  type: LOGIN_USER,
  userCredentials,
});

export const saveUserAction = (user: User): SaveUserAction => ({
  type: SAVE_USER,
  user,
});

export const logOutUserAction = (): Action => ({ type: LOGOUT_USER });

export const changePasswordAction = (
  passwordChangeDetails: PasswordChangeDetails,
): ChangePasswordAction => ({
  type: CHANGE_PASSWORD,
  passwordChangeDetails,
});

export const clearUserAction = (): ClearUserAction => ({ type: CLEAR_USER });

export const rateMovieAction = (
  movieRating: UserMovieRating,
  isNewRating: boolean,
): RateMovieAction => ({
  type: RATE_MOVIE,
  movieRating,
  isNewRating,
});

export const deleteRatingAction = (movieId: string): DeleteRatingAction => ({
  type: DELETE_RATING,
  movieId,
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

export const removeRatingAction = (movieId: string): RemoveRatingAction => ({
  type: REMOVE_RATING,
  movieId,
});

export const addMovieToWatchlistAction = (
  movie: UserMovie,
): AddWatchlistMovieAction => ({
  type: WATCHLIST_ADD_MOVIE,
  movie,
});

export const saveMovieToWatchlistAction = (
  movie: UserMovie,
): SaveWatchlistMovieAction => ({
  type: WATCHLIST_SAVE_MOVIE,
  movie,
});

export const removeWatchlistMovieAction = (
  movieId: string,
): RemoveWatchlistMovieAction => ({
  type: WATCHLIST_REMOVE_MOVIE,
  movieId,
});

export const deleteWatchlistMovieAction = (
  movieId: string,
): DeleteWatchlistMovieAction => ({
  type: WATCHLIST_DELETE_MOVIE,
  movieId,
});
