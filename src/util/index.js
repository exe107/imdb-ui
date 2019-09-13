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
