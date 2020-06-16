// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CHANGE_PASSWORD_ROUTE } from 'app/navigation/routes';
import { getInitializationData, logOutUser } from 'app/http';
import { asyncOperation } from 'app/redux/util';
import { saveInitializationDataAction } from 'app/redux/actions';
import type { UserPersonalDetails as PersonalDetails } from 'app/redux/user/flow';
import type {
  InitializationData,
  InitializationDataAction,
} from 'app/redux/flow';

const UserButton = styled.button`
  :focus {
    box-shadow: none !important;
  }
`;

type Props = {
  personalDetails: PersonalDetails,
  saveInitializationData: InitializationData => InitializationDataAction,
};

export const User = ({
  personalDetails,
  saveInitializationData,
}: Props): React.Node => {
  const { name, surname } = personalDetails;

  const onLogoutClick = React.useCallback(
    () =>
      asyncOperation(() =>
        logOutUser()
          .then(getInitializationData) // needed for the new csrf token.
          .then(saveInitializationData),
      ),
    [saveInitializationData],
  );

  return (
    <div className="dropdown">
      <UserButton
        className="btn d-flex align-items-center"
        type="button"
        data-toggle="dropdown"
      >
        <i className="fa fa-2x fa-user text-white mr-3" />
        <span className="text-white">{`${name} ${surname}`}</span>
      </UserButton>
      <div className="dropdown-menu">
        <Link className="dropdown-item" to={CHANGE_PASSWORD_ROUTE.path}>
          Change password
        </Link>
        <button type="button" className="dropdown-item" onClick={onLogoutClick}>
          Log out
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  saveInitializationData: saveInitializationDataAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(User);
