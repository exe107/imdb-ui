// @flow
import type { State } from 'app/redux/flow';

export const getSpinner = (state: State): boolean => !!state.spinner;
