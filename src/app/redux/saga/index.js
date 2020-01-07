// @flow
import { all } from 'redux-saga/effects';

type SagaFunction = Generator<any, any, any>;

export default function* rootSaga(): SagaFunction {
  yield all([]);
}
