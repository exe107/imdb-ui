export const constructUrl = (route, pathVariables) => {
  if (!pathVariables) {
    return route;
  }

  let index = 0;

  return route
    .split("/")
    .map(urlSegment =>
      urlSegment.startsWith(":") ? pathVariables[index++] : urlSegment
    )
    .join("/");
};

export const extractQueryResult = response => {
  const {
    results: { bindings }
  } = response;

  if (bindings.length === 0) return null;

  return bindings[0].result.value;
};

export const extractQueryResults = response => {
  return response.results.bindings.map(binding => binding.result.value);
};
