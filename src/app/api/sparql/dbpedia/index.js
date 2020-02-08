// @flow
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

export const findPersonAbstract = (person: string) =>
  `SELECT ?result WHERE {
  ?person rdfs:label "${person}"@en;
          dbo:abstract ?result.
  filter(lang(?result) = 'en')
}`;

const herokuProxy = String(process.env.REACT_APP_HEROKU_PROXY);

export const runDbpediaQuery = (query: string) =>
  fetch(
    encodeURI(
      `${herokuProxy}https://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&format=json&query=${query}`,
    ),
  ).then(response => response.json());
