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
import { ROUTES } from "./navigation/routes";
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
              <Link className="nav-link" to="/movies-search">
                Movies
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row full-screen">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Switch>
              {ROUTES.map(route => (
                <Route key={route.path} {...route} />
              ))}
              <Route component={Home} />
            </Switch>
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({ spinner: getSpinner(state) });

export default connect(mapStateToProps)(App);
