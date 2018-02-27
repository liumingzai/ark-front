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
                <Icon type="dashboard" /> 首页
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
            key="p04"
            title={
              <span>
                <Icon type="user" /> <span>用户中心</span>
              </span>
            }
          >
            <Menu.Item key="p04sub01">
              <Link to={`${props.match.path}/setting`}>
                <Icon type="setting" /> 个人中心
              </Link>
            </Menu.Item>
            <Menu.Item key="p04sub02">
              <Link to={`${props.match.path}/api/scene`}>
                <Icon type="info-circle" /> 场景管理
              </Link>
            </Menu.Item>
          </SubMent>

          <SubMent
            key="p02"
            title={
              <span>
                <Icon type="api" /> <span>接口统计</span>
              </span>
            }
          >
            <Menu.Item key="p02sub01">
              <Link to={`${props.match.path}/api/apirecord`}>
                <Icon type="info-circle" /> 接口调用记录
              </Link>
            </Menu.Item>

            <Menu.Item key="p02sub02">
              <Link to={`${props.match.path}/api/whitelist`}>
                <Icon type="info-circle" />{' '}
                {props.account.userType === 1 ? '白名单访问记录' : '白名单拦截记录'}
              </Link>
            </Menu.Item>
          </SubMent>

          <Menu.Item key="p05">
            <Link to={`${props.match.path}/api/overview`}>
              <Icon type="database" /> 数据接口
            </Link>
          </Menu.Item>

          {props.account.userType === 1 ? (
            <SubMent
              key="p03"
              title={
                <span>
                  <Icon type="appstore" /> <span>数据管理</span>
                </span>
              }
            >
              <Menu.Item key="p03sub01">
                <Link to={`${props.match.path}/data/keyword/ent`}>
                  <Icon type="info-circle" /> 企业关键字
                </Link>
              </Menu.Item>
            </SubMent>
          ) : null}
        </Menu>
      </Sider>
      {props.children}
    </Layout>
  );
}

export default SideNav;
