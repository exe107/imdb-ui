// @flow
import _get from 'lodash/get';
import type {
  Movie,
  Person,
  SparqlBinding,
  SparqlResponse,
} from 'app/api/sparql/flow';

const herokuProxy = String(process.env.REACT_APP_HEROKU_PROXY);

export const runQuery = (query: string) =>
  fetch(`${herokuProxy}${query}`).then(response => response.json());

export const isResponseEmpty = ({ results }: SparqlResponse) =>
  results.bindings.length === 0;

export const extractQuerySingleResult = ({ results }: SparqlResponse): string =>
  _get(results, 'bindings[0].result.value');

export const extractQueryMultipleResults = ({
  results: { bindings },
}: SparqlResponse): string[] =>
  bindings.map(({ result }: SparqlBinding) => result.value);

export const extractMoviesQueryResults = ({
  results: { bindings },
}: SparqlResponse): Movie[] =>
  bindings.map(({ name, id, year }: SparqlBinding) => ({
    name: name.value,
    id: id.value,
    year: year && year.value,
  }));

export const extractPeopleQueryResults = ({
  results: { bindings },
}: SparqlResponse): Person[] =>
  bindings.map(({ name, id }: SparqlBinding) => ({
    name: name.value,
    id: id.value,
  }));
