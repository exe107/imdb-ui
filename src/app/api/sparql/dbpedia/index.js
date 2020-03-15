// @flow
import { runQuery } from 'app/api/util';

export const findPersonAbstractBySameAs = (resource: string) =>
  `SELECT ?resource ?abstract WHERE {
    ?resource owl:sameAs ${resource};
              dbo:abstract ?abstract.
    filter(lang(?abstract) = 'en')
  }`;

export const findPersonAbstract = (resource: string) =>
  `SELECT ?result WHERE {
    ${resource} dbo:abstract ?result.
    filter(lang(?result) = 'en')
  }`;

export const runDbpediaQuery = (query: string) =>
  runQuery(
    `https://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&format=json&query=${encodeURIComponent(
      query,
    )}`,
  );
