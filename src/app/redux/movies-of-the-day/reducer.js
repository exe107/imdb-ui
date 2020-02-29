// @flow
import { createReducer } from 'app/redux/util';
import { SAVE_INITIALIZATION_DATA } from 'app/redux/actions';
import type { InitializationDataAction } from 'app/redux/flow';

const saveMoviesOfTheDay = (
  state: string[],
  { initializationData }: InitializationDataAction,
) => initializationData.movieIdsForToday;

export default createReducer(
  {
    [SAVE_INITIALIZATION_DATA]: saveMoviesOfTheDay,
  },
  null,
);
