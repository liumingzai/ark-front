import React from 'react';
import { Route } from 'react-router-dom';
import Overview from './Overview';

function Api({ match }) {
  return (
    <div>
      <Route path={`${match.path}/overview`} component={Overview} />
    </div>
  );
}

export default Api;
