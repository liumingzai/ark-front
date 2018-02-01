/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Select, Button, Modal, message, Divider, Spin } from 'antd';
import AuthService from './AuthService';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

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
  }

  componentDidMount() {
    this.handleSearch({
      permissionName: this.state.queryParam.permissionName,
      path: this.state.queryParam.path,
      active: this.state.queryParam.active,
      pageNum: this.state.pagination.current,
    });
  }

  changePermissionName(e) {
    this.setState({
      queryParam: {
        permissionName: e.target.value,
        path: this.state.queryParam.path,
        active: this.state.queryParam.active,
        pageNum: this.state.pagination.current,
      },
    });
  }

  changePathName(e) {
    this.setState({
      queryParam: {
        permissionName: this.state.queryParam.permissionName,
        path: e.target.value,
        active: this.state.queryParam.active,
        pageNum: this.state.pagination.current,
      },
    });
  }

  changeState(value) {
    this.setState({
      queryParam: {
        permissionName: this.state.queryParam.permissionName,
        path: this.state.queryParam.path,
        active: value,
        pageNum: this.state.pagination.current,
      },
    });
  }

  /*分页事件*/
  onChange(current) {
    this.setState({
      pagination: {
        current: current,
      },
    });
    this.handleSearch({
      permissionName: this.state.queryParam.permissionName,
      path: this.state.queryParam.path,
      active: this.state.queryParam.active,
      pageNum: current,
    });
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
            _that.handleSearch({
              permissionName: this.state.queryParam.permissionName,
              path: _that.state.queryParam.path,
              active: _that.state.queryParam.active,
              pageNum: _that.state.pagination.current,
            });
          }
        });
      },
    });
  }

  // 排序变化
  handleChange(pagination, filters, sorter) {
    this.handleSearch({
      permissionName: this.state.queryParam.permissionName,
      path: this.state.queryParam.path,
      active: this.state.queryParam.active,
      pageNum: this.state.pagination.current,
      entryDatatime: sorter.order == 'ascend' ? 1 : 0,
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

  handleSubmit(e) {
    e.preventDefault();
    let _that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = Object.assign({}, this.state.queryParam);
        _that.handleSearch(params);
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
        render: val => {
          return moment(val).format('YYYY-MM-DD HH:mm:ss');
        },
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
            <Link to={'/manager/account/auth/edit/' + record.id}>编辑</Link>
            <Divider type="vertical" />
            <a className="delete-data" onClick={this.handleDeleteUser.bind(this, record.id)}>
              删除
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
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="权限名称">
            <Input
              type="text"
              value={this.state.queryParam.permissionName}
              placeholder="请输入权限名称"
              onChange={this.changePermissionName.bind(this)}
            />
          </FormItem>
          <FormItem label="路径名称">
            <Input
              type="text"
              value={this.state.queryParam.path}
              placeholder="请输入路径名称"
              onChange={this.changePathName.bind(this)}
            />
          </FormItem>
          <FormItem label="状态">
            <Select style={{ width: 200 }} defaultValue="" onChange={this.changeState.bind(this)}>
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
