import React from 'react';
import Loadable from 'react-loadable';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import Loading from './components/Loading';

const history = createHistory();

const HomeAsync = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading,
});

const LogInAsync = Loadable({
  loader: () => import('./pages/LogIn'),
  loading: Loading,
});

const UserAsync = Loadable({
  loader: () => import('./pages/User'),
  loading: Loading,
});

const ManagerAsync = Loadable({
  loader: () => import('./pages/Manager'),
  loading: Loading,
});

const NotFoundAsync = Loadable({
  loader: () => import('./pages/NotFound'),
  loading: Loading,
});

function Routes() {
  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/" exact component={HomeAsync} />
          <Route path="/login" component={LogInAsync} />
          <Route path="/user" component={UserAsync} />
          <Route path="/manager" component={ManagerAsync} />
          <Route component={NotFoundAsync} />
        </Switch>
      </App>
    </Router>
  );
}

export default Routes;
