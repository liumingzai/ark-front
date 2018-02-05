/*eslint-disable*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Tabs, Form, Input, Radio, Checkbox, Button, message, Row, Col } from 'antd';
import UserService from './UserService';
import Scene from '../../Api/Scene';

import _ from 'lodash';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const history = createHistory();

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        email: '',
        phone: '',
        state: '',
        roles: [],
      },
      roles: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userService = new UserService();
    this.getRoles();
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.getUserById(this.props.match.params.id);
    }
  }

  componentDidMount() {
    // 表单校验未成功，提交按钮不可点击
    this.props.form.validateFields();
  }

  getUserById(id) {
    this.userService.getUserById(id).then(data => {
      if ('2000' === data.code) {
        let entity = Object.assign({}, data.data);
        entity.roles = [];
        data.data.roles.map(function(item) {
          entity.roles.push(item.name);
        });
        this.setState({
          user: entity,
        });
        console.log(this.state.user);
      }
    });
  }

  getRoles() {
    this.userService.getRoleList().then(data => {
      if ('2000' === data.code) {
        console.warn(data);
        this.setState({
          roles: data.data,
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let queryParam = Object.assign({}, values);
        let roles = this.state.roles;
        queryParam.roles = [];
        values.roles.map(function(item) {
          let index = _.findIndex(roles, function(o) {
            return o.name == item;
          });
          queryParam.roles.push(roles[index]);
        });
        if (this.props.match.params.id) {
          queryParam.id = this.props.match.params.id;
          this.userService.updateUser(queryParam).then(data => {
            if ('2000' === data.code) {
              message.success('update user success！！！');
              history.goBack();
            }
          });
        } else {
          this.userService.addUser(queryParam).then(data => {
            if ('2000' === data.code) {
              message.success('create user success！！！');
              this.props.form.resetFields();
              history.goBack();
            }
          });
        }
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
      <Tabs defaultActiveKey="1" onChange={this.handleChange}>
        <TabPane tab="新增用户" key="1">
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator(
                'username',
                {
                  initialValue: this.state.user.username ? this.state.user.username : '',
                },
                {
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空',
                    },
                  ],
                }
              )(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator(
                'email',
                {
                  initialValue: this.state.user.email ? this.state.user.email : '',
                },
                {
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
                }
              )(<Input placeholder="请输入邮箱" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="手机">
              {getFieldDecorator(
                'phone',
                {
                  initialValue: this.state.user.phone ? this.state.user.phone : '',
                },
                {
                  rules: [
                    {
                      required: true,
                      message: '手机不能为空',
                    },
                  ],
                }
              )(<Input placeholder="请输入手机" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="用户状态">
              {getFieldDecorator(
                'state',
                {
                  initialValue: this.state.user.state ? '1' : '0',
                },
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择用户状态',
                    },
                  ],
                }
              )(
                <RadioGroup>
                  <Radio value="1">有效</Radio>
                  <Radio value="0">无效</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="绑定角色">
              {getFieldDecorator('roles', {
                initialValue: this.state.user.roles ? this.state.user.roles : [],
              })(
                <Checkbox.Group style={{ width: '100%' }} onChange={this.handleChange}>
                  <Row>
                    {this.state.roles.map(e => (
                      <Col key={e.id} span={8}>
                        <Checkbox value={e.name}>{e.name}</Checkbox>
                      </Col>
                    ))}
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
        </TabPane>
        <TabPane tab="场景管理" key="2">
          <Scene />
        </TabPane>
      </Tabs>
    );
  }
}

const WrappedUserForm = Form.create()(UserForm);
export default WrappedUserForm;
