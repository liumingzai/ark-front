import React from 'react';
import { Tabs, Table, button, message } from 'antd';
import moment from 'moment';
import RoleService from './RoleService';

const { TabPane } = Tabs;

class RoleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binds: [],
      unBinds: [],
      bindPagination: {
        total: 0,
        pageSize: 10,
      },
      unBindPagination: {
        total: 0,
        pageSize: 10,
      },
    };
    this.roleService = new RoleService();
    this.handleChange = this.handleChange.bind(this);
    this.handleUnBind = this.handleUnBind.bind(this);
    this.handleBind = this.handleBind.bind(this);
  }

  componentDidMount() {
    this.getBinds({ pageNum: 1 });
    this.getUnBinds({ pageNum: 1 });
  }

  onBindChange(current) {
    this.getBinds({ pageNum: current });
  }

  onUnBindChange(current) {
    this.getUnBinds({ pageNum: current });
  }

  getBinds(e) {
    this.roleService.getBindsByRoleId(this.props.match.params.id, e.pageNum).then((data) => {
      if (data.code === '2000') {
        const pagination = { ...this.state.bindPagination };
        pagination.total = data.size;
        this.setState({
          binds: data.data,
          bindPagination: pagination,
        });
      }
    });
  }

  getUnBinds(e) {
    this.roleService.getUnBindsByRoleId(this.props.match.params.id, e.pageNum).then((data) => {
      if (data.code === '2000') {
        const pagination = { ...this.state.unBindPagination };
        pagination.total = data.size;
        this.setState({
          unBinds: data.data,
          unBindPagination: pagination,
        });
      }
    });
  }

  handleBind(authId) {
    const permissions = [];
    permissions.push({ id: authId });
    this.roleService.addBind(this.props.match.params.id, permissions).then((data) => {
      if (data.code === '2000') {
        message.success('bind auth success！！！');
        this.setState({
          binds: data.data,
        });
        this.getUnBinds({ pageNum: 1 });
      }
    });
  }

  handleUnBind(authId) {
    const permissions = [];
    permissions.push({ id: authId });
    this.roleService.deleteBind(this.props.match.params.id, permissions).then((data) => {
      if (data.code === '2000') {
        message.success('unbind auth success！！！');
        this.setState({
          binds: data.data,
        });
        this.getBinds({ pageNum: 1 });
      }
    });
  }

  handleChange(activeKey) {
    if (activeKey === '1') {
      this.getBinds({ pageNum: 1 });
    } else {
      this.getUnBinds({ pageNum: 1 });
    }
  }

  render() {
    const bindColumns = [
      {
        title: '显示名',
        dataIndex: 'displayName',
        key: 'displayName',
      },
      {
        title: '权限名称',
        dataIndex: 'permissionName',
        key: 'permissionName',
      },
      {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '创建时间',
        dataIndex: 'entryDatatime',
        key: 'entryDatatime',
        render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.entryDatatime - b.entryDatatime,
      },
      {
        title: '有效标识',
        dataIndex: 'active',
        key: 'state',
        // filters: [{ text: '无效', value: 'N' }, { text: '有效', value: 'Y' }],
        render: text => <span>{text ? '有效' : '无效'}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <button
              className="delete-data"
              onClick={() => {
                this.handleUnBind(record.id);
              }}
            >
              解绑
            </button>
          </span>
        ),
      },
    ];

    const unBindColumns = [
      {
        title: '显示名',
        dataIndex: 'displayName',
        key: 'displayName',
      },
      {
        title: '权限名称',
        dataIndex: 'permissionName',
        key: 'permissionName',
      },
      {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '创建时间',
        dataIndex: 'entryDatatime',
        key: 'entryDatatime',
        render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.entryDatatime - b.entryDatatime,
      },
      {
        title: '有效标识',
        dataIndex: 'active',
        key: 'state',
        // filters: [{ text: '无效', value: 'N' }, { text: '有效', value: 'Y' }],
        render: text => <span>{text ? '有效' : '无效'}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <button
              className="delete-data"
              onClick={() => {
                this.handleBind(record.id);
              }}
            >
              绑定
            </button>
          </span>
        ),
      },
    ];

    return (
      <Tabs defaultActiveKey="1" onChange={this.handleChange}>
        <TabPane tab="已绑定资源" key="1">
          <Table
            rowKey={record => record.id}
            columns={bindColumns}
            dataSource={this.state.binds}
            pagination={{
              defaultCurrent: 1,
              total: this.state.bindPagination.total,
              pageSize: this.state.bindPagination.pageSize,
              hideOnSinglePage: true,
              onChange: this.onBindChange.bind(this),
            }}
          />
        </TabPane>
        <TabPane tab="未绑定资源" key="2">
          <Table
            rowKey={record => record.id}
            columns={unBindColumns}
            dataSource={this.state.unBinds}
            pagination={{
              defaultCurrent: 1,
              total: this.state.unBindPagination.total,
              pageSize: this.state.unBindPagination.pageSize,
              hideOnSinglePage: true,
              onChange: this.onUnBindChange.bind(this),
            }}
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default RoleAuth;
