/*eslint-disable*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Radio, Button, message, Row, Col } from 'antd';
import AuthService from './AuthService';

import _ from 'lodash';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authService = new AuthService();
    this.getFilters();
    this.getScopes();
  }

  componentDidMount() {
    // 表单校验未成功，提交按钮不可点击
    this.props.form.validateFields();
  }

  getFilters() {
    this.authService.getFilters().then(data => {
      if ('2000' === data.code) {
        return data.data;
      }
    });
  }

  getgetScopes() {
    this.authService.getScopes().then(data => {
      if ('2000' === data.code) {
        return data.data;
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.authService.addAuth(values).then(data => {
          if ('2000' === data.code) {
            message.success('create auth success！！！');
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
        <FormItem {...formItemLayout} label="权限名称">
          {getFieldDecorator('permissionName', {
            rules: [
              {
                required: true,
                message: '权限名称不能为空',
              },
            ],
          })(<Input placeholder="请输入权限名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="显示名称">
          {getFieldDecorator('displayName', {
            rules: [
              {
                required: true,
                message: '显示名称不能为空',
              },
            ],
          })(<Input placeholder="请输入显示名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="路径">
          {getFieldDecorator('path', {
            rules: [
              {
                required: true,
                message: '路径不能为空',
              },
            ],
          })(<Input placeholder="请输入路径" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="过滤器">
          {getFieldDecorator('permissionFilter', {
            rules: [
              {
                required: true,
                message: '请选择过滤器',
              },
            ],
          })(
            <RadioGroup>
              <Radio value="Y">有效</Radio>
              <Radio value="N">无效</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="作用域">
          {getFieldDecorator('permissionScope', {
            rules: [
              {
                required: true,
                message: '请选择作用域',
              },
            ],
          })(
            <RadioGroup>
              <Radio value="Y">有效</Radio>
              <Radio value="N">无效</Radio>
            </RadioGroup>
          )}
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

const WrappedAuthForm = Form.create()(AuthForm);
export default WrappedAuthForm;
