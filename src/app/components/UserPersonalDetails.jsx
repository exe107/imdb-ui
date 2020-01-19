// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { asyncOperation } from 'app/common/util';
import { logoutUser } from 'app/http';
import { clearUser } from 'app/redux/user/actions';
import { addError } from 'app/redux/errors/actions';
import type {
  ClearUserAction,
  UserPersonalDetails as PersonalDetails,
} from 'app/redux/user/flow';
import type { AddErrorAction } from 'app/redux/errors/flow';

const UserButton = styled.button`
  :focus {
    box-shadow: none !important;
  }
`;

type Props = {
  personalDetails: PersonalDetails,
  clearUser: () => ClearUserAction,
  addError: string => AddErrorAction,
};

export const UserPersonalDetails = ({
  personalDetails,
  clearUser,
  addError,
}: Props): React.Node => {
  const { name, surname } = personalDetails;

  const onLogoutClick = React.useCallback(
    () =>
      asyncOperation(() =>
        logoutUser()
          .then(clearUser)
          .catch(addError),
      ),
    [clearUser, addError],
  );

  return (
    <div className="dropdown">
      <UserButton
        className="btn d-flex align-items-center"
        type="button"
        data-toggle="dropdown"
      >
        <i className="fa fa-2x fa-user text-white mr-3" />
        <span className="text-white">
          {name} {surname}
        </span>
      </UserButton>
      <div className="dropdown-menu">
        <button type="button" className="dropdown-item" onClick={onLogoutClick}>
          Log out
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  clearUser,
  addError,
};

export default connect(
  null,
  mapDispatchToProps,
)(UserPersonalDetails);
