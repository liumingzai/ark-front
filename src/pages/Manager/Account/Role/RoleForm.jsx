import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Form, Input, Radio, Button, message } from 'antd';
import RoleService from './RoleService';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const history = createHistory();

class RoleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: {
        name: '',
        description: '',
        active: '',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.roleService = new RoleService();
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getRoleById();
    }
    // 表单校验未成功，提交按钮不可点击
    this.props.form.validateFields();
  }

  getRoleById() {
    this.roleService.getRoleById(this.props.match.params.id).then((data) => {
      if (data.code === '2000') {
        this.setState({
          role: data.data,
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
          this.roleService.updateRole(values).then((data) => {
            if (data.code === '2000') {
              message.success('update role success！！！');
              history.goBack();
            }
          });
        } else {
          this.roleService.addRole(values).then((data) => {
            if (data.code === '2000') {
              message.success('create role success！！！');
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
        <FormItem {...formItemLayout} label="角色名">
          {getFieldDecorator(
            'name',
            {
              initialValue: this.state.role.name || '',
            },
            {
              rules: [
                {
                  required: true,
                  message: '角色名不能为空',
                },
              ],
            },
          )(<Input placeholder="请输入角色名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {getFieldDecorator(
            'description',
            {
              initialValue: this.state.role.description || '',
            },
            {
              rules: [
                {
                  required: false,
                },
              ],
            },
          )(<Input placeholder="请输入描述信息" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="有效状态">
          {getFieldDecorator(
            'active',
            {
              initialValue: this.state.role.active || '',
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

const WrappedRoleForm = Form.create()(RoleForm);
export default WrappedRoleForm;
