// @flow
import type {
  PasswordChangeDetails,
  UserCredentials,
  UserMovie,
  UserMovieIdentifier,
  UserMovieRating,
  UserPersonalDetails,
} from 'app/redux/user/flow';
import type { NewReview } from 'app/pages/movie/reviews/flow';

const createRequestOptions = (method: string, body?: Object): Object => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  };

  if (body) {
    return { ...requestOptions, body: JSON.stringify(body) };
  }

  return requestOptions;
};

const handleResponse = (response: Response): Object => {
  if (response.status === 204) {
    return null;
  }

  return response
    .json()
    .then(body => (response.ok ? body : Promise.reject(body.message)));
};

const GET = (url: string) =>
  fetch(url, createRequestOptions('GET')).then(handleResponse);

const POST = (url: string, body?: Object) =>
  fetch(url, createRequestOptions('POST', body)).then(handleResponse);

const DELETE = (url: string) =>
  fetch(url, createRequestOptions('DELETE')).then(handleResponse);

export const getInitializationData = () => GET('/initialization');

export const registerUser = (body: UserPersonalDetails & UserCredentials) =>
  POST('/register', body);

export const logInUser = (body: UserCredentials) => POST('/login', body);

export const logOutUser = () => POST('/logout');

export const editProfile = (body: UserPersonalDetails) =>
  POST('/users/edit/profile', body);

export const changePassword = (body: PasswordChangeDetails) =>
  POST('/users/edit/password', body);

export const rateMovie = (body: UserMovieRating) =>
  POST('/movies/ratings', body);

export const deleteRating = (movieId: string) =>
  DELETE(`/movies/ratings/${movieId}`);

export const addWatchlistMovie = (body: UserMovie) =>
  POST('/movies/watchlist', body);

export const deleteWatchlistMovie = (movieId: string) =>
  DELETE(`/movies/watchlist/${movieId}`);

export const getReviews = (movieId: string) => GET(`/reviews/${movieId}`);

export const addReview = (body: NewReview) => POST('/reviews/add', body);

export const deleteReview = (movieId: string) => DELETE(`/reviews/${movieId}`);

export const approveReview = (body: UserMovieIdentifier) =>
  POST('/reviews/approve', body);

export const rejectReview = (body: UserMovieIdentifier) =>
  POST('/reviews/reject', body);
