// @flow
import { parse } from 'qs';
import type {
  MovieDetailsResponse,
  MovieSearchResponse,
} from 'app/api/omdb/flow';

const herokuProxy = String(process.env.REACT_APP_HEROKU_PROXY);
const omdbEndpoint = String(process.env.REACT_APP_OMDB_ENDPOINT);
const apiKey = String(process.env.REACT_APP_OMDB_APIKEY);

const ENDPOINT_PROXY = `${herokuProxy}${omdbEndpoint}?apikey=${apiKey}&type=movie&plot=full`;

export const getMovie = (
  queryString: string,
): Promise<MovieDetailsResponse> => {
  const queryStringObj = parse(queryString, {
    ignoreQueryPrefix: true,
  });

  const { id, title } = queryStringObj;
  const url = id ? `${ENDPOINT_PROXY}&i=${id}` : `${ENDPOINT_PROXY}&t=${title}`;

  return fetch(url).then(response => response.json());
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
