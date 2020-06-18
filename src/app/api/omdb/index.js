// @flow
import { parse } from 'qs';
import type {
  MovieDetailsResponse,
  MovieSearchResponse,
} from 'app/api/omdb/flow';

const herokuProxy = String(process.env.REACT_APP_HEROKU_PROXY);
const omdbEndpoint = 'http://www.omdbapi.com/';
const apiKey = String(process.env.REACT_APP_OMDB_APIKEY);

const ENDPOINT_PROXY = `${herokuProxy}${omdbEndpoint}?apikey=${apiKey}&type=movie&plot=full`;

export const getMovieById = (imdbId: string) =>
  fetch(`${ENDPOINT_PROXY}&i=${imdbId}`).then(response => response.json());

export const getMovie = (
  queryString: string,
): Promise<MovieDetailsResponse> => {
  const queryStringObj = parse(queryString, {
    ignoreQueryPrefix: true,
  });

  return getMovieById(queryStringObj.id);
};

export const searchMovie = (
  queryString: string,
): Promise<MovieSearchResponse> => {
  const queryStringObj = parse(queryString, {
    ignoreQueryPrefix: true,
  });

  return fetch(`${ENDPOINT_PROXY}&s=${queryStringObj.search}`).then(response =>
    response.json(),
  );
};
