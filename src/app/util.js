// @flow
import _get from 'lodash/get';
import moment from 'moment';
import { DESCENDING } from 'app/constants';

export const createNaturalOrderComparator = (
  sortKey: string,
  sortOrder: string,
) => (first: Object, second: Object) => {
  let firstKey = _get(first, sortKey);
  let secondKey = _get(second, sortKey);

  if (typeof firstKey === 'string') {
    firstKey = firstKey.toLowerCase();
    secondKey = secondKey.toLowerCase();
  }

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

export const formatRuntime = (runtimeInMinutes: number) => {
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  const formattedHours = `${hours} hr`;
  const formattedMinutes = `${minutes} min`;

  if (minutes === 0) {
    return formattedHours;
  }

  if (hours === 0) {
    return formattedMinutes;
  }

  return `${formattedHours} ${formattedMinutes}`;
};
