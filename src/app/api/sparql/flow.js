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
