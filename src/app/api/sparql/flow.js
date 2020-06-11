// @flow
export type SparqlResult = {
  value: string,
};

export type SparqlBinding = {
  // the key corresponds to the variables (preceded with ?) in the query
  [key: string]: SparqlResult,
};

type SparqlResults = {
  bindings: SparqlBinding[],
};

export type SparqlResponse = {
  results: SparqlResults,
};

export type Movie = {
  resource: string,
  id: string,
  name: string,
  year: ?string,
};

export type Person = {
  resource?: string,
  id: ?string,
  name: string,
};

export type Resource = {
  resource: string,
  name: string,
};
