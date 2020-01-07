// @flow
import { stringify } from 'qs';
import { history } from 'app/redux/history';

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

export const redirect = (to: string) => history.push(to);

export const goBack = () => history.goBack();
