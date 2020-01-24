// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logOutUser } from 'app/redux/user/actions';
import type { Action } from 'redux';
import type { UserPersonalDetails as PersonalDetails } from 'app/redux/user/flow';

const UserButton = styled.button`
  :focus {
    box-shadow: none !important;
  }
`;

type Props = {
  personalDetails: PersonalDetails,
  logOutUser: () => Action,
};

export const UserPersonalDetails = ({
  personalDetails,
  logOutUser,
}: Props): React.Node => {
  const { name, surname } = personalDetails;

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
        <button type="button" className="dropdown-item" onClick={logOutUser}>
          Log out
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  logOutUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(UserPersonalDetails);
