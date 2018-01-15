import React from 'react';
import { Route } from 'react-router-dom';
import Overview from './Overview';
import Scene from './Scene';
import Whitelist from './Whitelist';
import ApiRecord from './ApiRecord';

function Api({ match }) {
  return (
    <div>
      <Route path={`${match.path}/overview`} component={Overview} />
      <Route path={`${match.path}/scene`} component={Scene} />
      <Route path={`${match.path}/whitelist`} component={Whitelist} />
      <Route path={`${match.path}/apirecord`} component={ApiRecord} />
    </div>
  );
}

export default Api;
