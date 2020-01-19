// @flow
import { takeEvery, call, put, all } from 'redux-saga/effects';
import {
  DELETE_RATING,
  RATE_MOVIE,
  removeRating,
  saveRating,
  updateRating,
} from 'app/redux/user/actions';
import { deleteRating, rateMovie } from 'app/http';
import { hideSpinner, showSpinner } from 'app/redux/spinner/actions';
import { addError } from 'app/redux/errors/actions';
import type { DeleteRatingAction, RateMovieAction } from 'app/redux/user/flow';

type SagaFunction = Generator<any, any, any>;

function withSpinner(worker: Function): Function {
  return function*(...args) {
    yield put(showSpinner());
    yield call(worker, ...args);
    yield put(hideSpinner());
  };
}

function* rateMovieWorker({
  movieRating,
  isNewRating,
}: RateMovieAction): SagaFunction {
  try {
    yield call(rateMovie, movieRating);

    const action = isNewRating
      ? saveRating(movieRating)
      : updateRating(movieRating);

    yield put(action);
  } catch (error) {
    yield put(addError(error));
  }
}

function* deleteRatingWorker({ movieId }: DeleteRatingAction): SagaFunction {
  try {
    yield call(deleteRating, movieId);
    yield put(removeRating(movieId));
  } catch (error) {
    yield put(addError(error));
  }
}

function* rateMovieWatcher(): SagaFunction {
  yield takeEvery(RATE_MOVIE, withSpinner(rateMovieWorker));
}

function* deleteRatingWatcher(): SagaFunction {
  yield takeEvery(DELETE_RATING, withSpinner(deleteRatingWorker));
}

export default function* rootSaga(): SagaFunction {
  yield all([rateMovieWatcher(), deleteRatingWatcher()]);
}
