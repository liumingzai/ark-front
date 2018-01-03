import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';
import styles from './Account.css';

const Li = styled.li`
  margin-right: 8px;
`;

function Account() {
  return (
    <nav>
      <ul className={styles.ul}>
        <Li>
          <Link to="/login">
            <Button>Log In</Button>
          </Link>
        </Li>
        <li>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Account;
