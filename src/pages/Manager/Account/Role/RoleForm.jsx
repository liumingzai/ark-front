/*eslint-disable*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Radio, Button, message, Row, Col } from 'antd';
import RoleService from './RoleService';

import _ from 'lodash';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class RoleForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.roleService = new RoleService();
  }

  componentDidMount() {
    // 表单校验未成功，提交按钮不可点击
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.roleService.addRole(values).then(data => {
          if ('2000' === data.code) {
            message.success('create role success！！！');
            this.props.form.resetFields();
          }
        });
      }
    });
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
        <FormItem {...formItemLayout} label="角色名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '角色名不能为空',
              },
            ],
          })(<Input placeholder="请输入角色名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {getFieldDecorator('description', {
            rules: [
              {
                required: false,
              },
            ],
          })(<Input placeholder="请输入描述信息" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="有效状态">
          {getFieldDecorator('active', {
            rules: [
              {
                required: true,
                message: '请选择有效状态',
              },
            ],
          })(
            <RadioGroup>
              <Radio value="Y">有效</Radio>
              <Radio value="N">无效</Radio>
            </RadioGroup>
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

const WrappedRoleForm = Form.create()(RoleForm);
export default WrappedRoleForm;
