// @flow
import type {
  InitializationData,
  InitializationDataAction,
} from 'app/redux/flow';

export const SAVE_INITIALIZATION_DATA = 'SAVE_INITIALIZATION_DATA';

export const saveInitializationDataAction = (
  initializationData: InitializationData,
): InitializationDataAction => ({
  type: SAVE_INITIALIZATION_DATA,
  initializationData,
});
