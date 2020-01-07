// @flow
import type { UserState } from 'app/redux/user/flow';
import type { SpinnerState } from 'app/redux/spinner/flow';

export type State = SpinnerState & UserState;
