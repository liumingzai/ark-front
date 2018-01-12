import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './User/UserList';
import UserForm from './User/UserForm';
import AuthForm from './Auth/AuthForm';
import AuthList from './Auth/AuthList';
import RoleForm from './Role/RoleForm';
import RoleList from './Role/RoleList';

function Account({ match }) {
  return (
    <section>
      <Router>
        <div style={{ display: 'flex' }}>
          <main>
            <Route exact path={`${match.path}/user/list`} component={UserList} />
            <Route exact path={`${match.path}/user/edit`} component={UserForm} />
            <Route exact path={`${match.path}/user/edit/:id`} component={UserForm} />
            <Route exact path={`${match.path}/role/list`} component={RoleList} />
            <Route exact path={`${match.path}/role/edit`} component={RoleForm} />
            <Route exact path={`${match.path}/role/edit/:id`} component={RoleForm} />
            <Route exact path={`${match.path}/auth/list`} component={AuthList} />
            <Route exact path={`${match.path}/auth/edit`} component={AuthForm} />
            <Route exact path={`${match.path}/auth/edit/:id`} component={AuthForm} />
          </main>
        </div>
      </Router>
    </section>
  );
}

export default Account;
