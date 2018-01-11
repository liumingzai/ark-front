import React from 'react';
import { Route } from 'react-router-dom';
import Overview from './Overview';

function Api({ match }) {
  return (
    <div>
      <h3>Heeeee</h3>
      <Route path={`${match.path}/overview`} component={Overview} />
    </div>
  );
}

export default Api;
