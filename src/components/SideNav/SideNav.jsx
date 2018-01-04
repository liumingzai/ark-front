import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'react-router-dom';

const SubMent = Menu.SubMenu;

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
      current: 'sub11',
    };

    this.changeTheme = this.changeTheme.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });

    console.warn(this.state.current);
  }

  changeTheme(value) {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  render() {
    return (
      <nav>
        <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <br />
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMent
            key="sub1"
            title={
              <span>
                <Icon type="team" /> <span>Account Manager</span>
              </span>
            }
          >
            <Menu.Item key="sub11">
              <Link to={`${this.props.match.path}/account/user`}>User Manager</Link>
            </Menu.Item>
          </SubMent>

          <SubMent
            key="sub2"
            title={
              <span>
                <Icon type="fork" /> <span>API Manager</span>
              </span>
            }
          >
            <Menu.Item key="sub21">
              <Link to={`${this.props.match.path}/api/whitelist`}>Whitelist</Link>
            </Menu.Item>
          </SubMent>

          <Menu.Item key="sub10">
            <Link to={`${this.props.match.path}/setting`}>
              <Icon type="setting" /> Setting
            </Link>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}

export default SideNav;
