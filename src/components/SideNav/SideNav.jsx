import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'react-router-dom';
import siderData from './sider.json';

const SubMent = Menu.SubMenu;

// FIX: TODO: fix down
const subMents = (function recursive(siderDataTmp) {
  return siderDataTmp.map((e) => {
    if (e.children) {
      return (
        <SubMent
          key={`${e.key}`}
          title={
            <span>
              <Icon type="team" /> <span>{e.name}</span>
            </span>
          }
        >
          recursive(e.children);
        </SubMent>
      );
    }
    return (
      <Menu.Item key={`item-${e.key}`}>
        <Link to="/account/user">User Manager</Link>
      </Menu.Item>
    );
  });
}(siderData));

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

  componentDidMount() {
    console.warn(siderData);
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
          {subMents}

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
