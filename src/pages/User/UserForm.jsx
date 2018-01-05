/*eslint-disable*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Radio, Button, Checkbox, Row, Col } from 'antd';
import UserService from './UserService';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userService = new UserService();
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.userService.addUser(values).then(data => {
          if ('2000' === data.code) {
            alert('添加用户成功！！！');
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
    const { getFieldDecorator } = this.props.form;
    console.warn(getFieldDecorator);
    return (
      <div>
        <h1>UserForm</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="用户名">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem label="用户UID">
            {getFieldDecorator('uid', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input placeholder="请输入用户UID" />)}
          </FormItem>
          <FormItem label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input placeholder="请输入邮箱" />)}
          </FormItem>
          <FormItem label="手机">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input placeholder="请输入手机" />)}
          </FormItem>
          <FormItem label="用户状态">
            {getFieldDecorator('status')(
              <RadioGroup>
                <Radio value="1">有效</Radio>
                <Radio value="0">无效</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="绑定角色">
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
          <FormItem>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedUserForm = Form.create()(UserForm);
export default WrappedUserForm;
