import * as React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "popper.js/dist/popper.min";

import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
import { getSpinner } from "./redux/spinner/selectors";
import { MOVIES_SEARCH_ROUTE, ROUTES } from "./navigation/routes";
import Home from "./pages/Home";

const Spinner = styled.div`
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 7;
`;

function App({ spinner }) {
  return (
    <React.Fragment>
      {spinner && (
        <Spinner>
          <div className="spinner-border" />
        </Spinner>
      )}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Open Data</span>
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
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row full-screen">
          <div className="col-sm-2 bg-secondary" />
          <div className="col-sm-8 pt-5">
            <Switch>
              {ROUTES.map(route => (
                <Route key={route.path} {...route} />
              ))}
              <Route component={Home} />
            </Switch>
          </div>
          <div className="col-sm-2 bg-secondary" />
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({ spinner: getSpinner(state) });

export default connect(mapStateToProps)(App);
