// @flow
export type SparqlResult = {
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
