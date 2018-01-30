import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Col, Select, Upload, message, Breadcrumb } from 'antd';
import OverviewEditService from './OverviewEditService';

const FormItem = Form.Item;
const { Option } = Select;
function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>API管理</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/manager/api/overview">接口管理</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>编辑接口</Breadcrumb.Item>
    </Breadcrumb>
  );
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
  onValuesChange(_, value) {
    console.warn(value);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  const uploadOption = {
    action: 'http://192.168.1.151/ark-portal/common/uploadPicture?entity=interface',
    listType: 'picture',
  };

  return (
    <Form>
      <Col span={24}>
        <BreadNav />
      </Col>
      <Col span={14}>
        <FormItem label="接口名称">
          {getFieldDecorator('apiName', {
            rules: [{ required: true, message: 'API name is required' }],
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
            rules: [{ required: true, message: 'Unit price is required' }],
          })(<Input />)}
        </FormItem>
      </Col>

      <Col span={14}>
        <FormItem label="显示图片">
          {getFieldDecorator('apiPic', {
            rules: [],
          })(
            <Upload {...uploadOption}>
              <Button>upload</Button>
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
    };
    this.service = new OverviewEditService();
    this.apiId = this.props.match.params.id;
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
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
        this.setState({
          fields,
        });
      }
    });
  }

  addApiOverview(body) {
    this.service.addApiOverview(body).then((data) => {
      if (data.code === '2000') {
        message.success('Add success');
      }
    });
  }

  updateApiOverview(body) {
    this.service.updateApiOverview(body).then((data) => {
      if (data.code === '2000') {
        message.success('Update success');
      }
    });
  }

  handleFormChange(changeFields) {
    this.setState({
      fields: { ...this.state.fields, ...changeFields },
    });
  }

  handleSave() {
    console.warn(this.state.fields);
    const data = {};
    Object.keys(this.state.fields).forEach((key) => {
      data[key] = this.state.fields[key].value;
    });

    if (this.apiId) {
      data.apiId = this.apiId;
      this.updateApiOverview(data);
    } else {
      this.addApiOverview(data);
    }
  }

  render() {
    const { fields } = this.state;
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
        <SearchForm {...fields} selectOptions={selectOptions} onChange={this.handleFormChange} />
        <Col span={14} style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={this.handleSave}>
            Save
          </Button>
        </Col>
      </div>
    );
  }
}

export default OverviewEdit;
