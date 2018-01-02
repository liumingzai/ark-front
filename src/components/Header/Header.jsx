import React from 'react';
import { Link } from 'react-router-dom';
import Account from '../Account';

function Header() {
  return (
    <header>
      <h3>ARK</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Account />
    </header>
  );
}

export default Header;
