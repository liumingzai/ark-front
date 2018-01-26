import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';
import UserAvatar from './UserAvatar';
import styles from './Account.scss';

const Li = styled.li`
  margin-right: 8px;
`;

class Account extends React.Component {
  constructor(props) {
    super(props);
    let account = localStorage.getItem('account');

    if (account) {
      account = JSON.parse(account);
    }

    this.state = {
      account,
    };
  }
  render() {
    return (
      <nav>
        {!this.state.account ? (
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
        ) : (
          <UserAvatar username={this.state.account.username} logo={this.state.account.logo} />
        )}
      </nav>
    );
  }
}

export default Account;
