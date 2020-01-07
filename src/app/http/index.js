// @flow
import type { UserCredentials, UserPersonalDetails } from 'app/redux/user/flow';

const get = (url: string) => fetch(url);

const post = (url: string, body: Object) =>
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const getInitializationData = () =>
  get('initialization').then(response => response.json());

export const registerUser = (body: UserPersonalDetails & UserCredentials) =>
  post('register', body).then(response => response.json());

export const loginUser = (body: UserCredentials) =>
  post('login', body).then(response => response.json());

export const logoutUser = () => post('logout');
