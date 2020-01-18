// @flow
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from 'app/navigation/routes';
import AppInitializer from 'app/components/AppInitializer';
import NavigationBar from 'app/components/NavigationBar';
import Errors from 'app/components/Errors';
import Home from 'app/pages/home/Home';
import type { Route as RouteType } from 'app/flow';

const PageContentContainer = styled.div`
  height: calc(100vh - 56px);
`;

const App = (): React.Node => (
  <AppInitializer>
    <NavigationBar />
    <PageContentContainer className="container-fluid">
      <div className="row h-100">
        <div className="col-sm-2 bg-secondary" />
        <div className="col-sm-8 pt-5">
          <Errors />
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
  </AppInitializer>
);

export default App;
