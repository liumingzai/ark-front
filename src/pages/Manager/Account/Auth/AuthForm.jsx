import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Form, Input, Radio, Select, Button, message } from 'antd';
import AuthService from './AuthService';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const history = createHistory();

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        permissionName: '',
        displayName: '',
        path: '',
        description: '',
        filters: '',
        permissionScope: '',
      },
      filters: [],
      scopes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authService = new AuthService();
    this.getFilters();
    this.getScopes();
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.getAuthById();
    }
  }

  componentDidMount() {
    // 表单校验未成功，提交按钮不可点击
    this.props.form.validateFields();
  }

  getAuthById() {
    this.authService.getAuthById(this.props.match.params.id).then((data) => {
      if (data.code === '2000') {
        this.setState({
          auth: data.data,
        });
      }
    });
  }

  getFilters() {
    this.authService.getFilters().then((data) => {
      if (data.code === '2000') {
        this.setState({
          filters: data.data,
        });
      }
    });
  }

  getScopes() {
    this.authService.getScopes().then((data) => {
      if (data.code === '2000') {
        this.setState({
          scopes: data.data,
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.match.params.id) {
          values.id = this.props.match.params.id;
          this.authService.updateAuth(values).then((data) => {
            if (data.code === '2000') {
              message.success('update auth success！！！');
              history.goBack();
            }
          });
        } else {
          this.authService.addAuth(values).then((data) => {
            if (data.code === '2000') {
              message.success('create auth success！！！');
              this.props.form.resetFields();
              history.goBack();
            }
          });
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
          {getFieldDecorator(
            'permissionName',
            {
              initialValue: this.state.auth.permissionName || '',
            },
            {
              rules: [
                {
                  required: true,
                  message: '权限名称不能为空',
                },
              ],
            },
          )(<Input placeholder="请输入权限名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="显示名称">
          {getFieldDecorator(
            'displayName',
            {
              initialValue: this.state.auth.displayName || '',
            },
            {
              rules: [
                {
                  required: true,
                  message: '显示名称不能为空',
                },
              ],
            },
          )(<Input placeholder="请输入显示名称" type="TextArea" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="路径">
          {getFieldDecorator(
            'path',
            {
              initialValue: this.state.auth.path || '',
            },
            {
              rules: [
                {
                  required: true,
                  message: '路径不能为空',
                },
              ],
            },
          )(<Input placeholder="请输入路径" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {getFieldDecorator(
            'description',
            {
              initialValue: this.state.auth.description || '',
            },
            {
              rules: [
                {
                  required: false,
                },
              ],
            },
          )(<TextArea placeholder="请输入描述" rows={4} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="过滤器">
          {getFieldDecorator(
            'filters',
            {
              initialValue: this.state.auth.filters || '',
            },
            {
              rules: [
                {
                  required: true,
                  message: '请选择过滤器',
                },
              ],
            },
          )(
            <Select style={{ width: 200 }} placeholder="请选择过滤器">
              {this.state.filters.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="作用域">
          {getFieldDecorator(
            'permissionScope',
            {
              initialValue: this.state.auth.permissionScope || '',
            },
            {
              rules: [
                {
                  required: true,
                  message: '请选择作用域',
                },
              ],
            },
          )(
            <Select style={{ width: 200 }} placeholder="请选择作用域">
              {this.state.scopes.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="有效状态">
          {getFieldDecorator(
            'active',
            {
              initialValue: this.state.auth.active || '',
            },
            {
              rules: [
                {
                  required: true,
                  message: '请选择有效状态',
                },
              ],
            },
          )(
            <RadioGroup>
              <Radio value="Y">有效</Radio>
              <Radio value="N">无效</Radio>
            </RadioGroup>,
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
