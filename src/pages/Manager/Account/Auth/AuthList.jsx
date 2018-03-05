import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Select, Button, Modal, message, Divider, Spin } from 'antd';
import moment from 'moment';
import AuthService from './AuthService';

const FormItem = Form.Item;
const { Option } = Select;

class AuthList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParam: {
        permissionName: '',
        path: '',
        active: '',
      },
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
      loading: false,
      data: [],
    };
    this.authService = new AuthService();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteAuth = this.handleDeleteAuth.bind(this);
    this.deleteAuth = this.deleteAuth.bind(this);
    this.changeDisplayName = this.changeDisplayName.bind(this);
    this.changePathName = this.changePathName.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.handleSearch({
      displayName: this.state.queryParam.displayName,
      path: this.state.queryParam.path,
      active: this.state.queryParam.active,
      pageNum: this.state.pagination.current,
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
      displaName: this.state.queryParam.displaName,
      path: this.state.queryParam.path,
      active: this.state.queryParam.active,
      pageNum: current,
    });
  }

  changeDisplayName(e) {
    this.setState({
      pagination: {
        current: 1,
      },
      queryParam: {
        displayName: e.target.value,
        path: this.state.queryParam.path,
        active: this.state.queryParam.active,
        pageNum: 1,
      },
    });
  }

  changePathName(e) {
    this.setState({
      pagination: {
        current: 1,
      },
      queryParam: {
        displayName: this.state.queryParam.displayName,
        path: e.target.value,
        active: this.state.queryParam.active,
        pageNum: 1,
      },
    });
  }

  changeState(value) {
    this.setState({
      pagination: {
        current: 1,
      },
      queryParam: {
        displayName: this.state.queryParam.displayName,
        path: this.state.queryParam.path,
        active: value,
        pageNum: 1,
      },
    });
  }

  handleDeleteAuth(authId) {
    Modal.confirm({
      title: '您确定要删除吗？',
      content: '此操作将彻底删除，并且不能恢复！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteAuth(authId);
      },
      onCancel: () => {
        message.success('已取消删除');
      },
    });
  }

  deleteAuth(authId) {
    this.authService.deleteAuthById(authId).then((data) => {
      if (data.code === '2000') {
        message.success('delete auth success！！！');
        this.handleSearch({
          displaName: this.state.queryParam.displaName,
          path: this.state.queryParam.path,
          active: this.state.queryParam.active,
          pageNum: this.state.pagination.current,
        });
      }
    });
  }

  // 排序变化
  handleChange(pagination, filters, sorter) {
    this.handleSearch({
      displaName: this.state.queryParam.displaName,
      path: this.state.queryParam.path,
      active: this.state.queryParam.active,
      pageNum: this.state.pagination.current,
      entryDatatime: sorter.order === 'ascend' ? 1 : 0,
    });
  }

  handleSearch(e) {
    this.setState({ loading: true });
    this.authService.getAuthList(e).then((data) => {
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
        const params = Object.assign({}, this.state.queryParam);
        this.handleSearch(params);
      }
    });
  }

  render() {
    const columns = [
      {
        title: '权限名称',
        width: 200,
        dataIndex: 'permissionName',
        key: 'permissionName',
      },
      {
        title: '显示名称',
        width: 200,
        dataIndex: 'displayName',
        key: 'displayName',
      },
      {
        title: '路径',
        width: 200,
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '过滤器',
        dataIndex: 'filters',
        key: 'filters',
      },
      {
        title: '作用域',
        dataIndex: 'permissionScope',
        key: 'permissionScope',
      },
      {
        title: '创建时间',
        dataIndex: 'entryDatetime',
        key: 'entryDatetime',
        render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.entryDatetime - b.entryDatetime,
      },
      {
        title: '有效标识',
        dataIndex: 'active',
        key: 'state',
        render: text => <span>{text === 'Y' ? '有效' : '无效'}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/manager/account/auth/edit/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <button
              className="delete-data"
              onClick={() => {
                this.handleDeleteAuth(record.id);
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
        <h1>权限管理</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="显示名称">
            <Input
              type="text"
              value={this.state.queryParam.displayName}
              placeholder="请输入显示名称"
              onChange={this.changeDisplayName}
            />
          </FormItem>
          <FormItem label="路径名称">
            <Input
              type="text"
              value={this.state.queryParam.path}
              placeholder="请输入路径名称"
              onChange={this.changePathName}
            />
          </FormItem>
          <FormItem label="状态">
            <Select style={{ width: 200 }} defaultValue="" onChange={this.changeState}>
              <Option value="">全部</Option>
              <Option value="Y">有效</Option>
              <Option value="N">无效</Option>
            </Select>
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary">
              <Link to="/manager/account/auth/edit" className="item">
                创建权限
              </Link>
            </Button>
          </FormItem>
        </Form>
        <Spin spinning={this.state.loading}>
          <Table
            rowKey={record => record.id}
            columns={columns}
            size="middle"
            dataSource={this.state.data}
            loading={this.state.loading}
            // onChange={this.handleChange}
            pagination={{
              defaultCurrent: 1,
              current: this.state.pagination.current,
              total: this.state.pagination.total,
              pageSize: this.state.pagination.pageSize,
              hideOnSinglePage: true,
              // onShowSizeChange: this.onShowSizeChange.bind(this),
              onChange: this.onChange.bind(this),
            }}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedAuthList = Form.create()(AuthList);
export default WrappedAuthList;
