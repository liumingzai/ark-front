import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Col, Select, Upload, message, Breadcrumb } from 'antd';
import OverviewEditService from './OverviewEditService';

const FormItem = Form.Item;
const { Option } = Select;
function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/manager/api/overview">数据接口</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>编辑接口</Breadcrumb.Item>
    </Breadcrumb>
  );
}

function handleImg(imgURL) {
  const pre = 'http://192.168.1.145/dc/';
  return {
    addPre() {
      return `${pre}${imgURL}`;
    },
    trimPre() {
      return imgURL.replace(pre, '');
    },
  };
}

const SearchForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      apiName: Form.createFormField({
        ...props.apiName,
        value: props.apiName.value,
      }),
      apiCategory: Form.createFormField({
        ...props.apiCategory,
        value: props.apiCategory.value,
      }),
      unitPrice: Form.createFormField({
        ...props.unitPrice,
        value: props.unitPrice.value,
      }),
      apiPic: Form.createFormField({
        ...props.apiPic,
        value: props.apiPic.value,
      }),
    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  const uploadOption = {
    name: 'upload',
    action: 'http://192.168.1.151/ark-portal/common/uploadPicture?entity=interface',
    listType: 'picture',
    onChange: props.onUploadImg,
    withCredentials: true,
    multiple: false,
    fileList: props.fileList,
    onRemove: props.onRemoveImg,
  };

  return (
    <Form>
      <Col span={24}>
        <BreadNav />
      </Col>
      <Col span={14}>
        <FormItem label="接口名称">
          {getFieldDecorator('apiName', {
            rules: [{ required: true, message: '接口名称不能为空' }],
          })(<Input />)}
        </FormItem>
      </Col>

      <Col span={14}>
        <FormItem label="接口分类">
          {getFieldDecorator('apiCategory', {
            rules: [],
          })(<Select style={{ width: 200 }}>{props.selectOptions}</Select>)}
        </FormItem>
      </Col>

      <Col span={14}>
        <FormItem label="调用单价(分/次)">
          {getFieldDecorator('unitPrice', {
            rules: [{ required: true, message: '调用单价不能为空' }],
          })(<Input />)}
        </FormItem>
      </Col>

      <Col span={14}>
        <FormItem label="显示图片">
          {getFieldDecorator('apiPic', {
            rules: [],
          })(
            <Upload {...uploadOption}>
              <Button>上传Logo</Button>
            </Upload>,
          )}
        </FormItem>
      </Col>
    </Form>
  );
});

class OverviewEdit extends React.Component {
  constructor(props) {
    super(props);
    const fileList = null;
    this.state = {
      fields: {
        apiName: {
          value: '',
        },
        apiCategory: {
          value: '',
        },
        unitPrice: {
          value: '',
        },
        apiPic: {
          value: '',
        },
      },
      apiPic: null,
      fileList,
    };
    this.service = new OverviewEditService();
    this.apiId = this.props.match.params.id;
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    if (this.apiId) {
      this.getApiOverView(this.apiId);
    }
  }

  getApiOverView(apiId) {
    this.service.getApiOverView(apiId).then((data) => {
      if (data.code === '2000') {
        const fields = {};
        Object.keys(data.data).forEach((key) => {
          fields[key] = {
            value: data.data[key],
          };
        });
        const fileList = data.data.apiPic
          ? [
            {
              uid: 1,
              name: '接口Logo',
              status: 'done',
              url: data.data.apiPic,
            },
          ]
          : null;
        this.setState({
          fields,
          fileList,
        });
      }
    });
  }

  addApiOverview(body) {
    this.service.addApiOverview(body).then((data) => {
      if (data.code === '2000') {
        message.success('添加成功');
        this.props.history.push('/manager/api/overview');
      }
    });
  }

  updateApiOverview(body) {
    this.service.updateApiOverview(body).then((data) => {
      if (data.code === '2000') {
        message.success('更新成功');
        this.props.history.push('/manager/api/overview');
      }
    });
  }

  handleFormChange(changeFields) {
    this.setState({
      fields: { ...this.state.fields, ...changeFields },
    });
  }

  handleSave() {
    const data = {};
    Object.keys(this.state.fields).forEach((key) => {
      data[key] = this.state.fields[key].value;
    });

    // reset apiPic
    data.apiPic = this.state.apiPic
      ? handleImg(this.state.apiPic).trimPre()
      : handleImg(this.state.fields.apiPic.value).trimPre();
    if (this.apiId) {
      data.apiId = this.apiId;
      this.updateApiOverview(data);
    } else {
      this.addApiOverview(data);
    }
  }

  handleUpload(e) {
    let fileItem;
    if (e.fileList && e.fileList.length > 1) {
      fileItem = [e.fileList.pop()]; // 大于1就赋值新的
    } else {
      fileItem = e.fileList;
    }

    this.setState({
      fileList: fileItem,
    });
    if (e.fileList && e.fileList.length > 0 && e.fileList[0].response) {
      this.setState({
        apiPic: e.fileList[0].response.message,
      });
    }
  }

  handleRemove() {
    this.setState({
      apiPic: null,
    });
  }

  render() {
    const { fields, fileList } = this.state;
    const selectOptions = [];
    const cats = ['企业', '专利', '工商', '其他'];
    for (let i = 0; i < cats.length; i++) {
      const tmp = (
        <Option key={i} value={cats[i]}>
          {cats[i]}
        </Option>
      );
      selectOptions.push(tmp);
    }

    return (
      <div>
        <SearchForm
          {...fields}
          fileList={fileList}
          selectOptions={selectOptions}
          onChange={this.handleFormChange}
          onUploadImg={this.handleUpload}
          onRemoveImg={this.handleRemove}
        />
        <Col span={14} style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={this.handleSave}>
            保存
          </Button>
        </Col>
      </div>
    );
  }
}

export default OverviewEdit;
