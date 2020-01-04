// @flow
import { stringify } from 'qs';

export const constructUrl = (
  route: string,
  pathVariables: string[],
  queryStringObj: Object,
): string => {
  if (!pathVariables) {
    return route;
  }

  let index = 0;

  const url = route
    .split('/')
    .map(urlSegment =>
      urlSegment.startsWith(':') ? pathVariables[index++] : urlSegment,
    )
    .join('/');

  const queryString = queryStringObj ? `?${stringify(queryStringObj)}` : '';

  return `${url}${queryString}`;
};
