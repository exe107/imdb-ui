// @flow
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'font-awesome/css/font-awesome.min.css';
import 'react-quill/dist/quill.snow.css';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from 'app/navigation/routes';
import AppInitializer from 'app/components/AppInitializer';
import NavigationBar from 'app/components/navbar/NavigationBar';
import Errors from 'app/components/Errors';
import MoviesSearch from 'app/pages/movies-search/MoviesSearch';
import type { Route as RouteType } from 'app/navigation/flow';

const PageContentContainer = styled.div`
  height: calc(100vh - 62px);
  margin-top: 62px;
`;

const App = (): React.Node => (
  <AppInitializer>
    <NavigationBar />
    <PageContentContainer className="container-fluid">
      <div className="row h-100">
        <div className="col-sm-1 bg-secondary" />
        <div className="col-sm-10 py-5 bg-light">
          <Errors />
          <Switch>
            {ROUTES.map(({ path, component }: RouteType) => (
              <Route key={path} path={path} component={component} />
            ))}
            <Route component={MoviesSearch} />
          </Switch>
        </div>
        <div className="col-sm-1 bg-secondary" />
      </div>
    </PageContentContainer>
  </AppInitializer>
);

export default App;
