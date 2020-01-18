// @flow
import type { UserCredentials, UserPersonalDetails } from 'app/redux/user/flow';

const handleResponse = (response: Response): Object =>
  response.status === 204
    ? null
    : response
        .json()
        .then(body => (response.ok ? body : Promise.reject(body.message)));

const get = (url: string) => fetch(url).then(handleResponse);

const post = (url: string, body: Object) =>
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(handleResponse);

export const getInitializationData = () => get('/initialization');

export const registerUser = (body: UserPersonalDetails & UserCredentials) =>
  post('/register', body);

export const loginUser = (body: UserCredentials) => post('/login', body);

export const logoutUser = () => post('/logout');
