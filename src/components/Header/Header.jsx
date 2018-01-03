import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Icon } from 'antd';
import Account from '../Account';

function Header() {
  return (
    <header>
      <h3>ARK</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <Avatar>
                <Icon type="pie-chart" />
              </Avatar>
            </Link>
          </li>
        </ul>
      </nav>

      <Account />
    </header>
  );
}

export default Header;
