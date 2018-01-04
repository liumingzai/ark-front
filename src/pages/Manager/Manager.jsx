import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import Api from './Api';
import Account from './Account';

function Manager({ match }) {
  return (
    <section>
      <Router>
        <div style={{ display: 'flex' }}>
          <SideNav match={match} />
          <main>
            <Route path={`${match.path}/api`} component={Api} />
            <Route path={`${match.path}/account`} component={Account} />
          </main>
        </div>
      </Router>
    </section>
  );
}

export default Manager;
