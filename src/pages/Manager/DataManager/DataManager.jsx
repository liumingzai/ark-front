import React from 'react';
import { Route } from 'react-router-dom';
import EntKeyword from './EntKeyword';

function DataManager({ match }) {
  return (
    <div>
      <Route path={`${match.path}/keyword/ent`} component={EntKeyword} />
    </div>
  );
}

export default DataManager;
