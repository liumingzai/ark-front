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
          {props.account.typeName === '管理员' ? (
            <Menu.Item key="sub01">
              <Link to={`${props.match.path}/dashboard`}>
                <Icon type="dashboard" /> Dashboard
              </Link>
            </Menu.Item>
          ) : null}
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
                  <Icon type="info-circle" /> 用户管理
                </Link>
              </Menu.Item>

              <Menu.Item key="p01sub02">
                <Link to={`${props.match.path}/account/role`}>
                  <Icon type="info-circle" /> 角色管理
                </Link>
              </Menu.Item>

              <Menu.Item key="p01sub03">
                <Link to={`${props.match.path}/account/auth`}>
                  <Icon type="info-circle" /> 权限管理
                </Link>
              </Menu.Item>
            </SubMent>
          ) : null}

          <SubMent
            key="p02"
            title={
              <span>
                <Icon type="api" /> <span>API管理</span>
              </span>
            }
          >
            <Menu.Item key="p02sub01">
              <Link to={`${props.match.path}/api/overview`}>
                <Icon type="info-circle" /> 接口管理
              </Link>
            </Menu.Item>

            <Menu.Item key="p02sub02">
              <Link to={`${props.match.path}/api/scene`}>
                <Icon type="info-circle" /> 场景管理
              </Link>
            </Menu.Item>

            <Menu.Item key="p02sub03">
              <Link to={`${props.match.path}/api/whitelist`}>
                <Icon type="info-circle" /> 白名单请求记录
              </Link>
            </Menu.Item>

            <Menu.Item key="p02sub04">
              <Link to={`${props.match.path}/api/apirecord`}>
                <Icon type="info-circle" /> API调用记录
              </Link>
            </Menu.Item>
          </SubMent>

          <SubMent
            key="p03"
            title={
              <span>
                <Icon type="database" /> <span>数据管理</span>
              </span>
            }
          >
            <Menu.Item key="p03sub01">
              <Link to={`${props.match.path}/data/keyword/ent`}>
                <Icon type="info-circle" /> 企业关键字
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
