// @flow
import { takeEvery, call, put, all } from 'redux-saga/effects';
import {
  LOGIN_USER,
  LOGOUT_USER,
  DELETE_RATING,
  RATE_MOVIE,
  clearUser,
  removeRating,
  saveRating,
  updateRating,
  saveUser,
  REGISTER_USER,
} from 'app/redux/user/actions';
import {
  deleteRating,
  logInUser,
  logOutUser,
  rateMovie,
  registerUser,
} from 'app/http';
import { hideSpinner, showSpinner } from 'app/redux/spinner/actions';
import { addError } from 'app/redux/errors/actions';
import type {
  DeleteRatingAction,
  LogInUserAction,
  RateMovieAction,
  RegisterUserAction,
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
  yield put(saveUser(user));
}

function* logInWorker({ userCredentials }: LogInUserAction): SagaFunction {
  const user = yield call(logInUser, userCredentials);
  yield put(saveUser(user));
}

function* logOutWorker(): SagaFunction {
  yield call(logOutUser);
  yield put(clearUser());
}

function* rateMovieWorker({
  movieRating,
  isNewRating,
}: RateMovieAction): SagaFunction {
  yield call(rateMovie, movieRating);

  const action = isNewRating
    ? saveRating(movieRating)
    : updateRating(movieRating);

  yield put(action);
}

function* deleteRatingWorker({ movieId }: DeleteRatingAction): SagaFunction {
  try {
    yield call(deleteRating, movieId);
    yield put(removeRating(movieId));
  } catch (error) {
    yield put(addError(error));
  }
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

function* rateMovieWatcher(): SagaFunction {
  yield takeEvery(RATE_MOVIE, withSpinner(rateMovieWorker));
}

function* deleteRatingWatcher(): SagaFunction {
  yield takeEvery(DELETE_RATING, withSpinner(deleteRatingWorker));
}

export default function* rootSaga(): SagaFunction {
  yield all([
    registerWatcher(),
    logInWatcher(),
    logOutWatcher(),
    rateMovieWatcher(),
    deleteRatingWatcher(),
  ]);
}
