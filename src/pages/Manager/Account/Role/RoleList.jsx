/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Button, Select, Modal, message, Divider, Spin } from 'antd';
import RoleService from './RoleService';
import moment from 'moment';
import Search from 'antd/lib/input/Search';

const FormItem = Form.Item;
const Option = Select.Option;

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

  changeState(value) {
    this.setState({
      active: value,
    });
  }

  changeName(e) {
    this.setState({
      name: e.target.value,
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
      name: this.state.name,
      pageNum: current,
      active: this.state.active,
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
        _that.roleService.deleteRoleById(e).then(data => {
          if ('2000' === data.code) {
            message.success('delete user success！！！');
            _that.handleSearch({
              name: _that.state.name,
              pageNum: _that.state.pagination.current,
              active: _that.state.active,
            });
          }
        });
      },
    });
  }

  // 排序变化
  handleChange(pagination, filters, sorter) {
    this.handleSearch({
      name: this.state.name,
      pageNum: this.state.pagination.current,
      active: this.state.active,
      entryDatatime: sorter.order == 'ascend' ? 1 : 0,
    });
  }

  handleSearch(e) {
    console.warn(111111111111111111111111111111111);
    this.setState({ loading: true });
    this.roleService.getRoleList(e).then(data => {
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
        _that.handleSearch({
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
        render: text => <span>{text == 'Y' ? '有效' : '无效'}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={'/manager/account/role/bind/' + record.id}>绑定</Link>
            <Divider type="vertical" />
            <Link to={'/manager/account/role/edit/' + record.id}>编辑</Link>
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
        <h1>角色管理</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="角色名">
            <Input
              type="text"
              value={this.state.name}
              placeholder="请输入角色名"
              onChange={this.changeName.bind(this)}
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
