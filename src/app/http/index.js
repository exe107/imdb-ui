// @flow
import type {
  UserCredentials,
  UserMovie,
  UserMovieRating,
  UserPersonalDetails,
} from 'app/redux/user/flow';
import type { NewComment } from 'app/pages/movie/comments/flow';

const createRequestOptions = (
  method: string,
  body?: Object,
): RequestOptions => {
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

const handleResponse = (response: Response): Object =>
  response.status === 204
    ? null
    : response
        .json()
        .then(body => (response.ok ? body : Promise.reject(body.message)));

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

export const rateMovie = (body: UserMovieRating) =>
  POST('/movies/ratings', body);

export const deleteRating = (movieId: string) =>
  DELETE(`/movies/ratings/${movieId}`);

export const addMovieToWatchlist = (body: UserMovie) =>
  POST('/movies/watchlist', body);

export const deleteWatchlistMovie = (movieId: string) =>
  DELETE(`/movies/watchlist/${movieId}`);

export const getComments = (movieId: string) => GET(`/comments/${movieId}`);

export const addComment = (body: NewComment) => POST('/comments', body);

export const deleteComment = (commentId: number) =>
  DELETE(`/comments/${commentId}`);
