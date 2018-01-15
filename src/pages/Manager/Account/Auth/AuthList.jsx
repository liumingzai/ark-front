/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Button, Modal, message, Divider, Spin } from 'antd';
import AuthService from './AuthService';
import moment from 'moment';
import { truncate } from 'fs';

const FormItem = Form.Item;

class RoleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParam: {
        username: '',
        uid: '',
      },
      pagination: {
        total: 0,
        pageSize: 10,
      },
      loading: false,
      data: [],
    };
    this.authService = new AuthService();
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch({ pageNum: 1 });
  }

  changeName(e) {
    this.setState({
      queryParam: {
        username: e.target.value,
        uid: this.state.queryParam.uid,
      },
    });
  }

  /*翻页事件 用于扩展*/
  onShowSizeChange(current) {
    this.handleSearch({ pageNum: current });
  }

  /*分页事件*/
  onChange(current) {
    this.handleSearch({ pageNum: current });
  }

  handleDeleteUser(e) {
    let _that = this;
    Modal.confirm({
      title: '您确定要删除该记录吗？',
      content: '删除操作是不可恢复的',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        _that.authService.deleteAuthById(e).then(data => {
          if ('2000' === data.code) {
            message.success('delete auth success！！！');
            _that.handleSearch({ pageNum: 1 });
          }
        });
      },
    });
  }

  handleSearch(e) {
    this.setState({ loading: true });
    this.authService.getAuthList(e).then(data => {
      if ('2000' === data.code) {
        const pagination = { ...this.state.pagination };
        pagination.total = data.size;
        this.setState({
          loading: false,
          pagination: pagination,
          data: data.data,
        });
      }
    });
  }

  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '权限名称',
        dataIndex: 'permissionName',
        key: 'permissionName',
      },
      {
        title: '显示名称',
        dataIndex: 'displayName',
        key: 'displayName',
      },
      {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '过滤器',
        dataIndex: 'permissionFilters',
        key: 'permissionFilters',
      },
      {
        title: '作用域',
        dataIndex: 'permissionScope',
        key: 'permissionScope',
      },
      {
        title: '创建时间',
        dataIndex: 'entryDatatime',
        key: 'entryDatatime',
        render: val => {
          return moment(val).format('YYYY-MM-DD HH:mm:ss');
        },
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.entryDatatime - b.entryDatatime,
      },
      {
        title: '有效标识',
        dataIndex: 'active',
        key: 'state',
        filters: [{ text: '无效', value: 'N' }, { text: '有效', value: 'Y' }],
        render: text => <span>{text === 'Y' ? '有效' : '无效'}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={'/manager/account/auth/edit/' + record.id}>Edit</Link>
            <Divider type="vertical" />
            <a className="delete-data" onClick={this.handleDeleteUser.bind(this, record.id)}>
              Delete
            </a>
          </span>
        ),
      },
    ];

    const FormItemLayout = {
      lableCol: { span: 4 },
      wrapperCol: { span: 8 },
    };

    const buttonItemLayout = {
      wrapperCol: { span: 8, offset: 4 },
    };

    return (
      <div>
        <h1>权限管理</h1>
        <br />
        <Link to="/manager/account/auth/edit" className="item">
          创建权限
        </Link>
        <Form layout="inline" onSubmit={this.handleSearch}>
          <FormItem label="权限名">
            <Input
              type="text"
              value={this.state.queryParam.permissionName}
              placeholder="请输入角色名"
              onChange={this.changeName.bind(this)}
            />
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" size="default" onClick={this.handleSearch}>
              查询
            </Button>
          </FormItem>
        </Form>
        <Spin spinning={this.state.loading}>
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={this.state.data}
            loading={this.state.loading}
            pagination={{
              defaultCurrent: 1,
              total: this.state.pagination.total,
              pageSize: this.state.pagination.pageSize,
              hideOnSinglePage: true,
              onShowSizeChange: this.onShowSizeChange.bind(this),
              onChange: this.onChange.bind(this),
            }}
          />
        </Spin>
      </div>
    );
  }
}

export default RoleList;
