// @flow
import _get from 'lodash/get';
import type {
  Resource,
  Movie,
  Person,
  SparqlBinding,
  SparqlResponse,
} from 'app/api/sparql/flow';

const herokuProxy = String(process.env.REACT_APP_HEROKU_PROXY);

export const runQuery = (endpoint: string) =>
  fetch(`${herokuProxy}${endpoint}`).then(response => response.json());

export const isResponseEmpty = ({ results }: SparqlResponse) =>
  results.bindings.length === 0;

export const extractQuerySingleResult = ({ results }: SparqlResponse): string =>
  _get(results, 'bindings[0].result.value');

export const extractResourceQueryResults = ({
  results: { bindings },
}: SparqlResponse): Resource[] =>
  bindings.map(({ resource, name }: SparqlBinding) => ({
    resource: resource.value,
    name: name.value,
  }));

export const extractResourceQuerySingleResult = (
  response: SparqlResponse,
): Resource => extractResourceQueryResults(response)[0];

export const extractMoviesQueryResults = ({
  results: { bindings },
}: SparqlResponse): Movie[] =>
  bindings.map(({ resource, name, id, year }: SparqlBinding) => ({
    resource: resource.value,
    name: name.value,
    id: id.value,
    year: year && year.value,
  }));

export const extractPeopleQueryResults = ({
  results: { bindings },
}: SparqlResponse): Person[] =>
  bindings.map(({ resource, name, id }: SparqlBinding) => ({
    resource: resource.value,
    name: name.value,
    id: id.value,
  }));
