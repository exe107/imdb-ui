// @flow
import { store } from 'app/redux';
import { hideSpinner, showSpinner } from 'app/redux/spinner/actions';

type AsyncFunction<T> = () => Promise<T>;

export const asyncOperation = async (asyncFn: AsyncFunction<any>): any => {
  const { dispatch } = store;

  dispatch(showSpinner());
  const result = await asyncFn();
  dispatch(hideSpinner());

  return result;
};
