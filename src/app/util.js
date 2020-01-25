// @flow
import _get from 'lodash/get';
import moment from 'moment';

export const ASCENDING = 'ASC';
export const DESCENDING = 'DESC';

export const createNaturalOrderComparator = (
  sortKey: string,
  sortOrder: string,
) => (first: Object, second: Object) => {
  const firstKey = _get(first, sortKey);
  const secondKey = _get(second, sortKey);
  const orderSign = sortOrder === DESCENDING ? -1 : 1;
  let sign;

  if (firstKey < secondKey) {
    sign = -1;
  } else if (firstKey > secondKey) {
    sign = 1;
  } else {
    sign = 0;
  }

  return orderSign * sign;
};

export const createDatesComparator = (sortKey: string, sortOrder: string) => (
  first: Object,
  second: Object,
) => {
  const firstKey = _get(first, sortKey);
  const firstDate = moment(firstKey);

  const secondKey = _get(second, sortKey);
  const secondDate = moment(secondKey);

  const orderSign = sortOrder === DESCENDING ? -1 : 1;

  return orderSign * firstDate.diff(secondDate);
};
