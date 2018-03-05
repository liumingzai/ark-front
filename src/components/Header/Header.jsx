import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Account from '../Account';
import styles from './Header.css';

const { Header } = Layout;

function HeaderLayout() {
  return (
    <Header className="header" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="logo">
        <Link style={{ color: '#fff' }} to="/">
          ARK-Front
        </Link>
      </div>
      <nav className={styles.flex}>
        {/* <ul>
          <li>
            <Link to="/" />
          </li>
        </ul> */}
      </nav>
      <Account />
    </Header>
  );
}

export default HeaderLayout;
