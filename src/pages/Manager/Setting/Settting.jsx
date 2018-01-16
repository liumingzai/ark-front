/* eslint-disable */
import React from 'react';
import { Upload, Icon, Modal, Form, Button } from 'antd';

const FormItem = Form.Item;

class Setting extends React.Component {
  constructor(props) {
    super(props);
    let account = localStorage.getItem('account');
    if (account) {
      account = JSON.parse(account);
    }
    this.state = {
      account: account,
      fileList: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange({ fileList }) {
    this.setState({ fileList });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div>
        <h1>账号设置</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="头像" {...formItemLayout}>
            {
              <div className="clearfix">
                <Upload
                  action="http://192.168.1.151/ark-portal/common/uploadPicture"
                  listType="picture-card"
                  accept={'image/*'}
                  fileList={fileList}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </div>
            }
          </FormItem>
          <FormItem label="用户UID" {...formItemLayout}>
            {
              <div>
                <span>{this.state.account.uid}</span>
              </div>
            }
          </FormItem>
          <FormItem label="用户名" {...formItemLayout}>
            {
              <div>
                <span>{this.state.account.username}</span>
              </div>
            }
          </FormItem>
          <FormItem label="用户类型" {...formItemLayout}>
            {
              <div>
                <span>{this.state.account.typeName}</span>
              </div>
            }
          </FormItem>
          <FormItem label="用户状态" {...formItemLayout}>
            {
              <div>
                <span>{this.state.account.state}</span>
              </div>
            }
          </FormItem>
          <FormItem label="手机" {...formItemLayout}>
            {
              <div>
                <span>{this.state.account.phone}</span>
              </div>
            }
          </FormItem>
          <FormItem label="邮箱" {...formItemLayout}>
            {
              <div>
                <span>{this.state.account.email}</span>
              </div>
            }
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrapSetting = Form.create()(Setting);
export default WrapSetting;
