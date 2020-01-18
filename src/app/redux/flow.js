// @flow
import type { UserState } from 'app/redux/user/flow';
import type { SpinnerState } from 'app/redux/spinner/flow';
import type { ErrorsState } from 'app/redux/errors/flow';

export type State = SpinnerState & ErrorsState & UserState;
