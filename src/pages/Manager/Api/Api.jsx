import React from 'react';
import { Route } from 'react-router-dom';
import Overview from './Overview';
import Scene from './Scene';

function Api({ match }) {
  return (
    <div>
      <Route path={`${match.path}/overview`} component={Overview} />
      <Route path={`${match.path}/scene`} component={Scene} />
    </div>
  );
}

export default Api;
