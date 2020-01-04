// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTER_ROUTE } from 'navigation/routes';

export const User = (): React.Node => (
  <React.Fragment>
    <li className="nav-item">
      <Link className="nav-link" to={LOGIN_ROUTE.path}>
        Log in
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={REGISTER_ROUTE.path}>
        Register
      </Link>
    </li>
  </React.Fragment>
);

export default User;
