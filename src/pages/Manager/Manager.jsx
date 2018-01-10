import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import Api from './Api';
import User from './Account/User';
import Setting from './Setting';

function Manager({ match }) {
  return (
    <section>
      <Router>
        <div style={{ display: 'flex' }}>
          <SideNav match={match} />
          <main>
            <Route path={`${match.path}/api`} component={Api} />
            <Route path={`${match.path}/user`} component={User} />
            <Route path={`${match.path}/setting`} component={Setting} />
          </main>
        </div>
      </Router>
    </section>
  );
}

export default Manager;
