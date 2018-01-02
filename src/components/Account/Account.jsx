import React from 'react';
import { Link } from 'react-router-dom';

function Account() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">
            LogIn
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Account;
