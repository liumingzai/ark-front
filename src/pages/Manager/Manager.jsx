import React from 'react';
import { Route } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import sideNavData from './sider.json';
import Api from './Api';
import Setting from './Setting';
import Account from './Account';

function Manager({ match }) {
  return (
    <section>
      <div style={{ display: 'flex' }}>
        <SideNav match={match} data={sideNavData} />
        <main style={{ flex: 1 }}>
          <Route path={`${match.path}/api`} component={Api} />
          <Route path={`${match.path}/account`} component={Account} />
          <Route path={`${match.path}/setting`} component={Setting} />
        </main>
      </div>
    </section>
  );
}

export default Manager;
