/* eslint-disable */
import React from 'react';
import { Upload, Icon, Modal, Form, Button } from 'antd';
import settingService from './SettingService';

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
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: -1,
          name: 'logo',
          status: 'done',
          url: account.logo,
        },
      ],
    };
    this.settingService = new settingService();
  }

  /**
   * 关闭预览
   */
  handleCancel() {
    console.warn('cancel', this.state.fileList);
    this.setState({ previewVisible: false });
  }

  /**
   * 查看预览
   * @param file
   */
  handlePreview(file) {
    console.warn('preview', file);
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    });
  }

  /**
   * 处理图片上传
   * @param {*} fileList
   */
  handleChange(e) {
    console.warn('change', e);
    let fileList = this.handleUpload(e);
  }

  handleUpload(e) {
    // const {fileList} = this.state;
    let fileList = e.fileList.map(file => {
      if (file.response) {
        //这个地方是上传结束之后会调用的方法，这边是判断success!!!
        if (file.response.success) {
          return this.filter(file);
        }
      }
      return file;
    });
    if (fileList.length) {
      const formData = new FormData();
      formData.append('filename', fileList[0].name);
      formData.append('entity', 'headPic');
      this.settingService.upload(formData);
    }
    this.setState({ fileList: fileList });
    return fileList;
  }

  /**
   * 过滤服务器返回的数据
   * @param file
   */
  filter(file) {
    const { name, response, uid, status } = file;
    return { name, url: response.data, uid, status };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList, previewVisible, previewImage } = this.state;
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
        <Form>
          <FormItem label="头像" {...formItemLayout}>
            {
              <div className="clearfix">
                <Upload
                  action="http://192.168.1.151/ark-portal/common/uploadPicture"
                  listType="picture-card"
                  accept={'image/*'}
                  fileList={fileList}
                  onPreview={this.handlePreview.bind(this)}
                  onRemove={this.handleCancel.bind(this)}
                  onChange={this.handleChange.bind(this)}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel.bind(this)}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
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
