import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Icon, Button } from 'antd';
import styled from 'styled-components';

const avatar = {
  backgroundColor: 'transparent',
  lineHeight: 1.15,
  borderBottom: 0,
};

const Figure = styled.figure`
  margin: 0;
  display: flex;
  align-items: center;
  padding: 2px 0;

  span:last-child {
    margin-left: 6px;
    color: #fff;
  }
`;

class UserAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    console.warn('click to log out.', this);
    localStorage.removeItem('account');
    window.location.reload();
  }

  render() {
    return (
      <Menu style={avatar} mode="horizontal">
        <Menu.SubMenu
          title={
            <Figure>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />{' '}
              <span>{this.props.username}</span>{' '}
            </Figure>
          }
        >
          <Menu.Item key="setting:1">
            <Link to="/manager/api">
              <Icon type="fork" /> API Manager{' '}
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <Link to="/manager/user">
              <Icon type="team" /> User Manager{' '}
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:3">
            <Link to="/manager/setting">
              <Icon type="setting" /> Setting{' '}
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:4">
            <Button onClick={this.logout}>
              <Icon type="logout" /> Log out
            </Button>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default UserAvatar;
