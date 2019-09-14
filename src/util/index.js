import { stringify } from "qs";

export const constructUrl = (route, pathVariables, queryStringObj) => {
  if (!pathVariables) {
    return route;
  }

  let index = 0;

  const url = route
    .split("/")
    .map(urlSegment =>
      urlSegment.startsWith(":") ? pathVariables[index++] : urlSegment
    )
    .join("/");

  const queryString = queryStringObj ? `?${stringify(queryStringObj)}` : "";

  return `${url}${queryString}`;
};

export const extractQueryResult = response => {
  const {
    results: { bindings }
  } = response;

  if (bindings.length === 0) {
    return null;
  }

  return bindings[0].result.value;
};

export const extractQueryResults = response => {
  return response.results.bindings.map(binding => binding.result.value);
};

export const extractMoviesQueryResults = response => {
  return response.results.bindings.map(({ name, id }) => ({
    name: name.value,
    id: id.value
  }));
};
