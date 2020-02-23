// @flow
import type { User, UserState } from 'app/redux/user/flow';
import type { SpinnerState } from 'app/redux/spinner/flow';
import type { ErrorsState } from 'app/redux/errors/flow';

export type InitializationData = {
  user: User,
};

export type State = SpinnerState & ErrorsState & UserState;
