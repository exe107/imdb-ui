export const findMoviesByWriter = writer =>
  `SELECT ?movie_name WHERE {
    ?writer rdfs:label "${writer}"@en.
    ?movie dbo:writer ?writer;
    rdfs:label ?movie_name.
    filter(lang(?movie_name) = 'en')
}`;

export const findMoviesByDirector = director =>
  `SELECT ?movie_name WHERE {
    ?director rdfs:label "${director}"@en.
    ?movie dbo:director ?director;
    rdfs:label ?movie_name.
    filter(lang(?movie_name) = 'en')
}`;
