import React from 'react';
import { Route } from 'react-router-dom';
import UserList from './User/UserList';
import UserForm from './User/UserForm';
import AuthForm from './Auth/AuthForm';
import AuthList from './Auth/AuthList';
import RoleForm from './Role/RoleForm';
import RoleList from './Role/RoleList';
import RoleAuth from './Role/RoleAuth';

function Account({ match }) {
  return (
    <div>
      <Route exact path={`${match.path}/user`} component={UserList} />
      <Route exact path={`${match.path}/user/edit`} component={UserForm} />
      <Route exact path={`${match.path}/user/edit/:id`} component={UserForm} />
      <Route exact path={`${match.path}/role`} component={RoleList} />
      <Route exact path={`${match.path}/role/edit`} component={RoleForm} />
      <Route exact path={`${match.path}/role/edit/:id`} component={RoleForm} />
      <Route exact path={`${match.path}/role/bind/:id`} component={RoleAuth} />
      <Route exact path={`${match.path}/auth`} component={AuthList} />
      <Route exact path={`${match.path}/auth/edit`} component={AuthForm} />
      <Route exact path={`${match.path}/auth/edit/:id`} component={AuthForm} />
    </div>
  );
}

export default Account;
