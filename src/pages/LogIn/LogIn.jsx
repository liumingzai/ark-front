import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './LogIn.css';
import LoginService from './LogInService';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.hanleSubmit = this.hanleSubmit.bind(this);
    this.loginService = new LoginService();
  }

  hanleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.loginService.loginByPassword(values.username, values.password).then((data) => {
          if (data.code === '2000') {
            const typeList = [1, 4, 5]; // 1管理员，4临港，5普通用户
            const idList = data.data.roles.map(item => item.id);
            let userType = null; // 1-管理员，2-临港，3-普通用户
            const typeNames = ['管理员', '临港用户', '普通用户'];
            // 暂时的业务，用户和角色都是1对1
            if (idList.length === 1 && typeList.indexOf(idList[0]) > -1) {
              userType = typeList.indexOf(idList[0]) + 1;
            }
            const loginData = {
              username: data.data.username,
              roles: data.data.roles,
              phone: data.data.phone,
              logo: data.data.headPic ? `${data.data.headPic}` : 'assets/images/common/person.svg',
              userType,
              typeName: typeNames[userType - 1],
              id: data.data.id,
            };

            localStorage.setItem('account', JSON.stringify(loginData));
            window.location.href = '/';
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.hanleSubmit} className={styles.loginForm}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input Your username' }],
          })(<Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            placeholder="Username"
          />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
          })(<Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            type="password"
            placeholder="Password"
          />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className={styles.forgotText} to="/resetpass">
            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className={styles.loginButton}>
            Log in
          </Button>
          Or <Link to="/login/phone">Log in with phone code</Link>
        </FormItem>
      </Form>
    );
  }
}

const LogIn = Form.create()(LoginForm);

export default LogIn;
