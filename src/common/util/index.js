// @flow
import { store } from 'redux-config';
import { hideSpinner, showSpinner } from 'redux-config/spinner/actions';

type AsyncFunction<T> = () => Promise<T>;

export const asyncOperation = async (asyncFn: AsyncFunction<any>): any => {
  const { dispatch } = store;

  dispatch(showSpinner());
  const result = await asyncFn();
  dispatch(hideSpinner());

  return result;
};
