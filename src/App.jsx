// @flow
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { MOVIES_SEARCH_ROUTE, ROUTES } from 'navigation/routes';
import { getSpinner } from 'redux-config/spinner/selectors';
import Home from 'pages/home/Home';
import User from 'pages/user/User';
import type { Route as RouteType } from 'flow';

const PageContentContainer = styled.div`
  height: calc(100vh - 56px);
`;

const Spinner = styled.div`
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 7;
`;

type Props = {
  spinner: boolean,
};

function App({ spinner }: Props) {
  return (
    <React.Fragment>
      {spinner && (
        <Spinner>
          <div className="spinner-border" />
        </Spinner>
      )}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <ul className="navbar-nav mr-auto">
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
              <User />
            </ul>
          </div>
        </div>
      </nav>
      <PageContentContainer className="container-fluid">
        <div className="row h-100">
          <div className="col-sm-2 bg-secondary" />
          <div className="col-sm-8 pt-5">
            <Switch>
              {ROUTES.map(({ path, component }: RouteType) => (
                <Route key={path} path={path} component={component} />
              ))}
              <Route component={Home} />
            </Switch>
          </div>
          <div className="col-sm-2 bg-secondary" />
        </div>
      </PageContentContainer>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({ spinner: getSpinner(state) });

export default connect(mapStateToProps)(App);
