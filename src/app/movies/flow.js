// @flow
type SparqlResult = {
  value: string,
};

export type SparqlBinding = {
  [key: string]: SparqlResult, // the key corresponds to the variables (preceded with ?) in the query
};

type SparqlResults = {
  bindings: SparqlBinding[],
};

export type SparqlResponse = {
  results: SparqlResults,
};

export type Movie = {
  id: string,
  name: string,
  year: ?string,
};

export type Person = {
  id: ?string,
  name: string,
};

export type MovieDetails = {
  imdbID: string,
  Response: string,
  Error: string,
  Poster: string,
  Title: string,
  Year: string,
  Plot: string,
  imdbRating: string,
  imdbVotes: string,
  Genre: string,
  Runtime: string,
  Language: string,
  Released: string,
  Website: string,
  Awards: string,
  Country: string,
  BoxOffice: string,
  Production: string,
  Actors: string,
  Director: string,
};
