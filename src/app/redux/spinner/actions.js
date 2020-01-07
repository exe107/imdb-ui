// @flow
import type { SpinnerAction } from 'app/redux/spinner/flow';

export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';

export const showSpinner = (): SpinnerAction => ({ type: SHOW_SPINNER });
export const hideSpinner = (): SpinnerAction => ({ type: HIDE_SPINNER });
