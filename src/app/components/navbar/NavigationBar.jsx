// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  MOVIES_SEARCH_ROUTE,
  RATINGS_ROUTE,
  REGISTER_ROUTE,
  WATCHLIST_ROUTE,
} from 'app/navigation/routes';
import { getUser } from 'app/redux/user/selectors';
import SearchBar from 'app/components/navbar/SearchBar';
import User from 'app/components/navbar/User';
import type { User as UserType } from 'app/redux/user/flow';

type Props = {
  user: UserType,
};

const NavigationBar = ({ user }: Props) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <div className="container">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav w-100">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={MOVIES_SEARCH_ROUTE.path}>
              Movies
            </Link>
          </li>
          {user ? (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to={RATINGS_ROUTE.path}>
                  My ratings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={WATCHLIST_ROUTE.path}>
                  Watchlist
                </Link>
              </li>
            </React.Fragment>
          ) : (
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
          )}
          <li className="nav-item w-50 ml-auto">
            <SearchBar />
          </li>
        </ul>
      </div>
      {user && <User personalDetails={user.personalDetails} />}
    </div>
  </nav>
);

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(NavigationBar);
