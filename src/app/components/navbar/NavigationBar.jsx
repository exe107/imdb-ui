// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  LOGIN_ROUTE,
  MOVIES_SEARCH_ROUTE,
  PENDING_REVIEWS_ROUTE,
  RATINGS_ROUTE,
  REGISTER_ROUTE,
  WATCHLIST_ROUTE,
} from 'app/navigation/routes';
import { getUser } from 'app/redux/user/selectors';
import SearchBar from 'app/components/navbar/SearchBar';
import User from 'app/components/navbar/User';
import type { User as UserType } from 'app/redux/user/flow';

const Navbar = styled.nav`
  min-height: 62px;
`;

const SearchBarListItem = styled.li`
  width: 40%;
`;

type Props = {
  user: UserType,
};

const NavigationBar = ({ user }: Props) => (
  <Navbar className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid px-5">
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
              <li className="nav-item mr-3">
                <Link className="nav-link" to={PENDING_REVIEWS_ROUTE.path}>
                  Pending reviews
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
              <li className="nav-item mr-3">
                <Link className="nav-link" to={REGISTER_ROUTE.path}>
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
          <SearchBarListItem className="nav-item">
            <SearchBar />
          </SearchBarListItem>
        </ul>
      </div>
      {user && <User personalDetails={user.personalDetails} />}
    </div>
  </Navbar>
);

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(NavigationBar);
