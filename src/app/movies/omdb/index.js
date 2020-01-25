// @flow
import { parse } from 'qs';
import type { MovieDetails } from 'app/flow';

const herokuProxy = String(process.env.REACT_APP_HEROKU_PROXY);
const omdbEndpoint = String(process.env.REACT_APP_OMDB_ENDPOINT);
const apiKey = String(process.env.REACT_APP_OMDB_APIKEY);

const ENDPOINT_PROXY = `${herokuProxy}${omdbEndpoint}?apikey=${apiKey}&type=movie&plot=full`;

export const searchMovie = (search: string): Promise<MovieDetails> => {
  const queryStringObj = parse(search, {
    ignoreQueryPrefix: true,
  });

  const { id, title } = queryStringObj;
  const movieResponse = id ? searchById(id) : searchByTitle(title);

  return movieResponse.then(response => response.json());
};

const searchByTitle = title => fetch(`${ENDPOINT_PROXY}&t=${title}`);

const searchById = id => fetch(`${ENDPOINT_PROXY}&i=${id}`);
