import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Select, Button, Modal, message, Divider, Spin } from 'antd';
import moment from 'moment';
import UserService from './UserService';

const FormItem = Form.Item;
const { Option } = Select;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      state: '',
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
      loading: false,
      data: [],
    };
    this.userService = new UserService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    this.handleSearch({
      username: this.state.username,
      pageNum: this.state.pagination.current,
      state: this.state.state,
    });
  }

  /* 分页事件 */
  onChange(current) {
    this.setState({
      pagination: {
        current,
      },
    });
    this.handleSearch({
      username: this.state.username,
      pageNum: current,
      state: this.state.state,
    });
  }

  changeState(value) {
    this.setState({
      state: value,
      pagination: {
        current: 1,
      },
    });
  }

  changeName(e) {
    this.setState({
      username: e.target.value,
      pagination: {
        current: 1,
      },
    });
  }

  handleDeleteUser(userId) {
    Modal.confirm({
      title: '您确定要删除吗？',
      content: '此操作将彻底删除，并且不能恢复！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteUser(userId);
      },
      onCancel: () => {
        message.success('已取消删除');
      },
    });
  }

  deleteUser(userId) {
    this.userService.deleteUserById(userId).then((data) => {
      if (data.code === '2000') {
        message.success('delete user success！！！');
        this.handleSearch({
          username: this.state.username,
          pageNum: this.state.pagination.current,
          state: this.state.state,
        });
      }
    });
  }

  // 排序变化
  handleChange(pagination, filters, sorter) {
    this.handleSearch({
      username: this.state.username,
      pageNum: pagination.current,
      state: this.state.state,
      createTimeSort: sorter.order === 'ascend' ? 1 : 0,
    });
  }

  handleSearch(e) {
    this.setState({ loading: true });
    this.userService.getUserList(e).then((data) => {
      if (data.code === '2000') {
        const pagination = { ...this.state.pagination };
        pagination.total = data.size;
        this.setState({
          loading: false,
          pagination,
          data: data.data,
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        this.handleSearch({
          username: this.state.username,
          state: this.state.state,
          pageNum: this.state.pagination.current,
        });
      }
    });
  }

  render() {
    const columns = [
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
        render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.createTime - b.createTime,
      },
      {
        title: '用户状态',
        dataIndex: 'state',
        key: 'state',
        render: text => <span>{text ? '有效' : '无效'}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/manager/account/user/edit/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <button
              className="delete-data"
              onClick={() => {
                this.handleDeleteUser(record.id);
              }}
            >
              删除
            </button>
          </span>
        ),
      },
    ];

    const buttonItemLayout = {
      wrapperCol: { span: 8, offset: 4 },
    };

    return (
      <div>
        <h1>用户管理</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="用户名">
            <Input
              type="text"
              value={this.state.username}
              placeholder="请输入用户名"
              onChange={this.changeName}
            />
          </FormItem>
          <FormItem label="状态">
            <Select style={{ width: 200 }} defaultValue="" onChange={this.changeState}>
              <Option value="">全部</Option>
              <Option value="1">有效</Option>
              <Option value="0">无效</Option>
            </Select>
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary">
              <Link to="/manager/account/user/edit" className="item">
                创建用户
              </Link>
            </Button>
          </FormItem>
        </Form>
        <Spin spinning={this.state.loading}>
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={this.state.data}
            loading={this.state.loading}
            // onChange={this.handleChange}
            pagination={{
              defaultCurrent: 1,
              current: this.state.pagination.current,
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

const WrappedUserList = Form.create()(UserList);
export default WrappedUserList;
