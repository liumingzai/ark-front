/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Button, Modal, message, Divider, Spin } from 'antd';
import UserService from './UserService';
import moment from 'moment';
import { truncate } from 'fs';

const FormItem = Form.Item;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParam: {
        username: null,
        uid: null,
      },
      pagination: {
        total: 0,
        pageSize: 10,
      },
      loading: false,
      data: [],
    };
    this.userService = new UserService();
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

  changeUid(e) {
    this.setState({
      queryParam: {
        username: this.state.queryParam.username,
        uid: e.target.value,
      },
    });
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
        _that.userService.deleteUserById(e).then(data => {
          if ('2000' === data.code) {
            message.success('delete user success！！！');
            _that.handleSearch({ pageNum: 1 });
          }
        });
      },
    });
  }

  handleSearch(e) {
    this.setState({ loading: true });
    let queryParam = Object.assign({}, e);
    if (this.state.queryParam) {
    }
    this.userService.getUserList(e).then(data => {
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
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'uid',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: val => {
          return moment(val).format('YYYY-MM-DD HH:mm:ss');
        },
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.createTime - b.createTime,
      },
      {
        title: '用户状态',
        dataIndex: 'state',
        key: 'state',
        filters: [{ text: '无效', value: '0' }, { text: '有效', value: '1' }],
        onFilter: (value, record) => record.state.indexOf(value) === 0,
        render: text => <span>{text ? '有效' : '无效'}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={'/manager/account/user/edit/' + record.id}>Edit</Link>
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
        <h1>用户管理</h1>
        <br />
        <Link to="/manager/account/user/edit" className="item">
          创建用户
        </Link>
        <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
          <FormItem label="用户名">
            <Input
              type="text"
              value={this.state.queryParam.username}
              placeholder="请输入用户名"
              onChange={this.changeName.bind(this)}
            />
          </FormItem>
          <FormItem label="UID">
            <Input
              type="text"
              value={this.state.queryParam.uid}
              placeholder="请输入uid"
              onChange={this.changeUid.bind(this)}
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
              onChange: this.onChange.bind(this),
            }}
          />
        </Spin>
      </div>
    );
  }
}

export default UserList;
