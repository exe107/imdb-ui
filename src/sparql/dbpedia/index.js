export const findMoviesByWriter = writer =>
  `SELECT DISTINCT ?result WHERE {
    ?writer rdfs:label "${writer}"@en.
    ?movie dbo:writer ?writer;
           rdf:type dbo:Film;
           foaf:name ?result.
    filter(lang(?result) = 'en')
}`;

export const findMoviesByDirector = director =>
  `SELECT DISTINCT ?result WHERE {
    ?director rdfs:label "${director}"@en.
    ?movie dbo:director ?director;
           rdf:type dbo:Film;
           foaf:name ?result.
    filter(lang(?result) = 'en')
}`;

export const findMoviesByActor = actor =>
  `SELECT DISTINCT ?result WHERE {
    ?actor rdfs:label "${actor}"@en.
    ?movie dbo:starring ?actor;
           rdf:type dbo:Film;
           foaf:name ?result.
    filter(lang(?result) = 'en')
}`;

export const findPersonAbstract = person =>
  `SELECT ?result WHERE {
  ?person rdfs:label "${person}"@en;
          dbo:abstract ?result.
  filter(lang(?result) = 'en')
}`;

export const runDbpediaQuery = query =>
  fetch(
    `https://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&format=json&query=${query}`
  ).then(response => response.json());
