import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const SubMent = Menu.SubMenu;

function SideNav(props) {
  return (
    <Layout>
      <Sider width={256} style={{ background: '#fff' }}>
        <Menu style={{ height: '100%', borderRight: 0 }} defaultOpenKeys={['sub1']} mode="inline">
          <Menu.Item key="sub01">
            <Link to={`${props.match.path}/dashboard`}>
              <Icon type="Dashboard" /> Dashboard
            </Link>
          </Menu.Item>
          {props.account.typeName === '管理员' ? (
            <SubMent
              key="p01"
              title={
                <span>
                  <Icon type="team" /> <span>账号管理</span>
                </span>
              }
            >
              <Menu.Item key="p01sub01">
                <Link to={`${props.match.path}/account/user`}>
                  <Icon type="setting" /> 用户管理
                </Link>
              </Menu.Item>

              <Menu.Item key="p01sub02">
                <Link to={`${props.match.path}/account/role`}>
                  <Icon type="setting" /> 角色管理
                </Link>
              </Menu.Item>

              <Menu.Item key="p01sub03">
                <Link to={`${props.match.path}/account/auth`}>
                  <Icon type="setting" /> 权限管理
                </Link>
              </Menu.Item>
            </SubMent>
          ) : null}

          <SubMent
            key="p02"
            title={
              <span>
                <Icon type="team" /> <span>API管理</span>
              </span>
            }
          >
            <Menu.Item key="p02sub01">
              <Link to={`${props.match.path}/api/overview`}>
                <Icon type="setting" /> 接口管理
              </Link>
            </Menu.Item>

            <Menu.Item key="p02sub02">
              <Link to={`${props.match.path}/api/scene`}>
                <Icon type="setting" /> 场景管理
              </Link>
            </Menu.Item>

            <Menu.Item key="p02sub03">
              <Link to={`${props.match.path}/api/whitelist`}>
                <Icon type="setting" /> 白名单请求记录
              </Link>
            </Menu.Item>

            <Menu.Item key="p02sub04">
              <Link to={`${props.match.path}/api/apirecord`}>
                <Icon type="setting" /> API调用记录
              </Link>
            </Menu.Item>
          </SubMent>

          <Menu.Item key="sub10">
            <Link to={`${props.match.path}/setting`}>
              <Icon type="setting" /> Setting
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      {props.children}
    </Layout>
  );
}

export default SideNav;
