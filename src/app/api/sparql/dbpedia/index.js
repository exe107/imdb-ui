// @flow
import { runQuery } from 'app/api/util';

export const findMoviesByWriter = (writer: string) =>
  `SELECT DISTINCT ?result WHERE {
    ?writer rdfs:label "${writer}"@en.
    ?movie dbo:writer ?writer;
           rdf:type dbo:Film;
           foaf:name ?result.
    filter(lang(?result) = 'en')
}`;

export const findMoviesByDirector = (director: string) =>
  `SELECT DISTINCT ?result WHERE {
    ?director rdfs:label "${director}"@en.
    ?movie dbo:director ?director;
           rdf:type dbo:Film;
           foaf:name ?result.
    filter(lang(?result) = 'en')
}`;

export const findMoviesByActor = (actor: string) =>
  `SELECT DISTINCT ?result WHERE {
    ?actor rdfs:label "${actor}"@en.
    ?movie dbo:starring ?actor;
           rdf:type dbo:Film;
           foaf:name ?result.
    filter(lang(?result) = 'en')
}`;

export const findPersonAbstractBySameAs = (resource: string) =>
  `SELECT ?result WHERE {
    ?person owl:sameAs ${resource};
            dbo:abstract ?result.
    filter(lang(?result) = 'en')
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
