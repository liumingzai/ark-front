import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Account from '../Account';
import styles from './Header.css';

const H3 = styled.h3`
  margin: 0;

  a {
    color: #fff;
  }
`;

function Header() {
  return (
    <header className={styles.header}>
      <H3>
        <Link to="/">ARK-Front</Link>
      </H3>
      <nav className={styles.flex}>
        {/* <ul>
          <li>
            <Link to="/" />
          </li>
        </ul> */}
      </nav>
      <Account />
    </header>
  );
}

export default Header;
