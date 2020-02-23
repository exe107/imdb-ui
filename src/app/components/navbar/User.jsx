// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CHANGE_PASSWORD_ROUTE } from 'app/navigation/routes';
import { getInitializationData, logOutUser } from 'app/http';
import { asyncOperation } from 'app/redux/util';
import { saveUserAction } from 'app/redux/user/actions';
import type {
  SaveUserAction,
  User as UserType,
  UserPersonalDetails as PersonalDetails,
} from 'app/redux/user/flow';
import type { InitializationData } from 'app/redux/flow';

const UserButton = styled.button`
  :focus {
    box-shadow: none !important;
  }
`;

type Props = {
  personalDetails: PersonalDetails,
  saveUser: UserType => SaveUserAction,
};

export const User = ({ personalDetails, saveUser }: Props): React.Node => {
  const { name, surname } = personalDetails;

  const onLogoutClick = React.useCallback(
    () =>
      asyncOperation(() =>
        logOutUser()
          .then(getInitializationData) // needed for the new csrf token.
          .then(({ user }: InitializationData) => saveUser(user)),
      ),
    [saveUser],
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
        <Link className="dropdown-item" to={CHANGE_PASSWORD_ROUTE.path}>
          Change password
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  saveUser: saveUserAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(User);
