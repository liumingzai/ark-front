import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Button, Select, Modal, message, Divider, Spin } from 'antd';
import moment from 'moment';
import RoleService from './RoleService';

const FormItem = Form.Item;
const { Option } = Select;

class RoleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      active: '',
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
      loading: false,
      data: [],
    };
    this.roleService = new RoleService();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
    this.handleDeleteRole = this.handleDeleteRole.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    // 表单校验未成功，提交按钮不可点击
    this.props.form.validateFields();
    this.handleSearch({
      name: this.state.name,
      pageNum: this.state.pagination.current,
      active: this.state.active,
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
      name: this.state.name,
      pageNum: current,
      active: this.state.active,
    });
  }

  changeState(value) {
    this.setState({
      active: value,
      pagination: {
        current: 1,
      },
    });
  }

  changeName(e) {
    this.setState({
      name: e.target.value,
      pagination: {
        current: 1,
      },
    });
  }

  handleDeleteRole(roleId) {
    Modal.confirm({
      title: '您确定要删除吗？',
      content: '此操作将彻底删除，并且不能恢复！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteRole(roleId);
      },
      onCancel: () => {
        message.success('已取消删除');
      },
    });
  }

  deleteRole(roleId) {
    this.roleService.deleteRoleById(roleId).then((data) => {
      if (data.code === '2000') {
        message.success('delete user success！！！');
        this.handleSearch({
          name: this.state.name,
          pageNum: this.state.pagination.current,
          active: this.state.active,
        });
      }
    });
  }

  // 排序变化
  handleChange(pagination, filters, sorter) {
    this.handleSearch({
      name: this.state.name,
      pageNum: this.state.pagination.current,
      active: this.state.active,
      entryDatatime: sorter.order === 'ascend' ? 1 : 0,
    });
  }

  handleSearch(e) {
    this.setState({ loading: true });
    this.roleService.getRoleList(e).then((data) => {
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
          name: this.state.name,
          pageNum: this.state.pagination.current,
          active: this.state.active,
        });
      }
    });
  }

  render() {
    const columns = [
      {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
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
            <Link to={`/manager/account/role/bind/${record.id}`}>绑定</Link>
            <Divider type="vertical" />
            <Link to={`/manager/account/role/edit/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <button
              className="delete-data"
              onClick={() => {
                this.handleDeleteRole(record.id);
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
        <h1>角色管理</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="角色名">
            <Input
              type="text"
              value={this.state.name}
              placeholder="请输入角色名"
              onChange={this.changeName}
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
              <Link to="/manager/account/role/edit" className="item">
                创建角色
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

const WrappedRoleList = Form.create()(RoleList);
export default WrappedRoleList;
