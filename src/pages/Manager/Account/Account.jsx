import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './User/UserList';
import UserForm from './User/UserForm';

function Account({ match }) {
  console.warn(match);
  return (
    <section>
      <Router>
        <div style={{ display: 'flex' }}>
          <main>
            <Route exact path={`${match.path}/user/list`} component={UserList} />
            <Route exact path={`${match.path}/user/edit`} component={UserForm} />
            <Route exact path={`${match.path}/user/edit/:id`} component={UserForm} />
          </main>
        </div>
      </Router>
    </section>
  );
}

export default Account;
