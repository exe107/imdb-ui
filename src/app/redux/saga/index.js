// @flow
import { takeEvery, call, put, all } from 'redux-saga/effects';
import { goBack } from 'app/navigation/util';
import {
  LOGIN_USER,
  LOGOUT_USER,
  RATE_MOVIE,
  saveRatingAction,
  updateRatingAction,
  saveUserAction,
  REGISTER_USER,
  deleteWatchlistMovieAction,
  WATCHLIST_REMOVE_MOVIE,
  WATCHLIST_ADD_MOVIE,
  saveMovieToWatchlistAction,
  CHANGE_PASSWORD,
  REMOVE_RATING,
  deleteRatingAction,
} from 'app/redux/user/actions';
import {
  addMovieToWatchlist,
  changePassword,
  deleteRating,
  deleteWatchlistMovie,
  getInitializationData,
  logInUser,
  logOutUser,
  rateMovie,
  registerUser,
} from 'app/http';
import { hideSpinner, showSpinner } from 'app/redux/spinner/actions';
import { addError } from 'app/redux/errors/actions';
import type {
  AddWatchlistMovieAction,
  ChangePasswordAction,
  LogInUserAction,
  RateMovieAction,
  RegisterUserAction,
  RemoveRatingAction,
  RemoveWatchlistMovieAction,
} from 'app/redux/user/flow';

type SagaFunction = Generator<any, any, any>;

function withSpinner(worker: Function): Function {
  return function*(...args) {
    yield put(showSpinner());

    try {
      yield call(worker, ...args);
    } catch (error) {
      yield put(addError(error));
    }

    yield put(hideSpinner());
  };
}

function* registerWorker({ userDetails }: RegisterUserAction): SagaFunction {
  const user = yield call(registerUser, userDetails);
  yield put(saveUserAction(user));
}

function* logInWorker({ userCredentials }: LogInUserAction): SagaFunction {
  const user = yield call(logInUser, userCredentials);
  yield put(saveUserAction(user));
}

function* logOutWorker(): SagaFunction {
  yield call(logOutUser);
  const { user } = yield call(getInitializationData);
  yield put(saveUserAction(user));
}

function* changePasswordWorker({
  passwordChangeDetails,
}: ChangePasswordAction): SagaFunction {
  yield call(changePassword, passwordChangeDetails);
  goBack();
}

function* rateMovieWorker({
  movieRating,
  isNewRating,
}: RateMovieAction): SagaFunction {
  yield call(rateMovie, movieRating);

  const action = isNewRating
    ? saveRatingAction(movieRating)
    : updateRatingAction(movieRating);

  yield put(action);
}

function* deleteRatingWorker({ movieId }: RemoveRatingAction): SagaFunction {
  yield call(deleteRating, movieId);
  yield put(deleteRatingAction(movieId));
}

function* addMovieToWatchlistWorker({
  movie,
}: AddWatchlistMovieAction): SagaFunction {
  yield call(addMovieToWatchlist, movie);
  yield put(saveMovieToWatchlistAction(movie));
}

function* deleteWatchlistMovieWorker({
  movieId,
}: RemoveWatchlistMovieAction): SagaFunction {
  yield call(deleteWatchlistMovie, movieId);
  yield put(deleteWatchlistMovieAction(movieId));
}

function* registerWatcher(): SagaFunction {
  yield takeEvery(REGISTER_USER, withSpinner(registerWorker));
}

function* logInWatcher(): SagaFunction {
  yield takeEvery(LOGIN_USER, withSpinner(logInWorker));
}

function* logOutWatcher(): SagaFunction {
  yield takeEvery(LOGOUT_USER, withSpinner(logOutWorker));
}

function* changePasswordWatcher(): SagaFunction {
  yield takeEvery(CHANGE_PASSWORD, withSpinner(changePasswordWorker));
}

function* rateMovieWatcher(): SagaFunction {
  yield takeEvery(RATE_MOVIE, withSpinner(rateMovieWorker));
}

function* deleteRatingWatcher(): SagaFunction {
  yield takeEvery(REMOVE_RATING, withSpinner(deleteRatingWorker));
}

function* addMovieToWatchlistWatcher(): SagaFunction {
  yield takeEvery(WATCHLIST_ADD_MOVIE, withSpinner(addMovieToWatchlistWorker));
}

function* deleteWatchlistMovieWatcher(): SagaFunction {
  yield takeEvery(
    WATCHLIST_REMOVE_MOVIE,
    withSpinner(deleteWatchlistMovieWorker),
  );
}

export default function* rootSaga(): SagaFunction {
  yield all([
    registerWatcher(),
    logInWatcher(),
    logOutWatcher(),
    changePasswordWatcher(),
    rateMovieWatcher(),
    deleteRatingWatcher(),
    addMovieToWatchlistWatcher(),
    deleteWatchlistMovieWatcher(),
  ]);
}
