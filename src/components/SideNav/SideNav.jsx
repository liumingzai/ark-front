import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMent = Menu.SubMenu;

// FIX: TODO: fix down make a component.
// const subMents = (function recursive(siderDataTmp) {
//   return siderDataTmp.map((e) => {
//     if (e.children) {
//       return (
//         <SubMent
//           key={`${e.key}`}
//           title={
//             <span>
//               <Icon type="team" /> <span>{e.name}</span>
//             </span>
//           }
//         >
//           recursive(e.children);
//         </SubMent>
//       );
//     }
//     return (
//       <Menu.Item key={`item-${e.key}`}>
//         <Link to="/account/user">User Manager</Link>
//       </Menu.Item>
//     );
//   });
// }());

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
        {/* <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        /> */}
        {/* <br /> */}
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMent
            key="p01"
            title={
              <span>
                <Icon type="team" /> <span>账号管理</span>
              </span>
            }
          >
            <Menu.Item key="p01sub01">
              <Link to={`${this.props.match.path}/account/user/list`}>
                <Icon type="setting" /> 用户管理
              </Link>
            </Menu.Item>

            <Menu.Item key="p01sub02">
              <Link to={`${this.props.match.path}/account/role/list`}>
                <Icon type="setting" /> 角色管理
              </Link>
            </Menu.Item>

            <Menu.Item key="p01sub03">
              <Link to={`${this.props.match.path}/account/auth/list`}>
                <Icon type="setting" /> 权限管理
              </Link>
            </Menu.Item>
          </SubMent>

          <SubMent
            key="p02"
            title={
              <span>
                <Icon type="team" /> <span>API管理</span>
              </span>
            }
          >
            <Menu.Item key="p02sub01">
              <Link to={`${this.props.match.path}/api/overview`}>
                <Icon type="setting" /> 接口管理
              </Link>
            </Menu.Item>

            <Menu.Item key="p02sub02">
              <Link to={`${this.props.match.path}/api/scene`}>
                <Icon type="setting" /> 场景管理
              </Link>
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
