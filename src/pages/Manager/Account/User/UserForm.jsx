/*eslint-disable*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Radio, Checkbox, Button, message, Row, Col } from 'antd';
import UserService from './UserService';

import _ from 'lodash';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userService = new UserService();
    if (this.props.match.params.id) {
      this.getUserById(this.props.match.params.id);
    }
    console.warn('construct');
  }

  componentWillMount() {
    console.warn('will mount');

    this.props.form.setFieldsValue({
      username: 'ddd',
    });
  }

  componentDidMount() {
    // 表单校验未成功，提交按钮不可点击
    console.warn('did mount');
    this.props.form.validateFields();
  }

  getUserById(id) {
    console.warn('1111111111111');
    this.userService.getUserById(id).then(data => {
      if ('2000' === data.code) {
        console.warn(data.data);
        this.setState({
          user: data.data,
        });
        console.warn('22222222222222', this.state.user);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let queryParam = Object.assign({}, values);
        let roles = [
          { id: 1, name: 'admin' },
          { id: 4, name: 'customize_user' },
          { id: 5, name: 'register_user' },
        ];
        queryParam.roles = [];
        values.roles.map(function(item) {
          let index = _.findIndex(roles, function(o) {
            return o.name == item;
          });
          queryParam.roles.push(roles[index]);
        });
        this.userService.addUser(queryParam).then(data => {
          if ('2000' === data.code) {
            message.success('create user success！！！');
            this.props.form.resetFields();
          }
        });
      }
    });
  }

  handleChange(checkedVales) {
    let newCheckValues = [];
    console.warn('checked=', checkedVales);
  }

  render() {
    {
      /* 解构复制 */
    }
    const { getFieldDecorator } = this.props.form;

    {
      /*定义表格元素样式*/
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 7 },
    };
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator('username', {
            initialValue: this.state.user.username || '',
            rules: [
              {
                required: true,
                message: '用户名不能为空',
              },
            ],
          })(<Input placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="用户UID">
          {getFieldDecorator('uid', {
            rules: [
              {
                required: false,
              },
            ],
          })(<Input placeholder="请输入用户UID" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="邮箱">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: '邮箱不能为空',
              },
              {
                type: 'email',
                message: '邮箱格式不对',
              },
            ],
          })(<Input placeholder="请输入邮箱" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: '手机不能为空',
              },
            ],
          })(<Input placeholder="请输入手机" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="用户状态">
          {getFieldDecorator('state', {
            rules: [
              {
                required: true,
                message: '请选择用户状态',
              },
            ],
          })(
            <RadioGroup>
              <Radio value="1">有效</Radio>
              <Radio value="0">无效</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="绑定角色">
          {getFieldDecorator('roles')(
            <Checkbox.Group style={{ width: '100%' }} onChange={this.handleChange}>
              <Row>
                <Col span={8}>
                  <Checkbox value="admin">admin</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="customize_user">customize</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="register_user">register</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedUserForm = Form.create()(UserForm);
export default WrappedUserForm;
