import React from 'react';
import { Form, Input, Col, Button } from 'antd';
import CodeError from './CodeError';
import OverviewDetailService from './OverviewDetailService';

const { TextArea } = Input;
const FormItem = Form.Item;

const DetailForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      accessUrl: Form.createFormField({
        ...props.accessUrl,
        value: props.accessUrl.value,
      }),
      queryType: Form.createFormField({
        ...props.queryType,
        value: props.queryType.value,
      }),
      returnType: Form.createFormField({
        ...props.returnType,
        value: props.returnType.value,
      }),
      accessSample: Form.createFormField({
        ...props.accessSample,
        value: props.accessSample.value,
      }),
      returnSample: Form.createFormField({
        ...props.returnSample,
        value: props.returnSample.value,
      }),
    };
  },
  onValuesChange(_, value) {
    console.warn(value);
  },
})((props) => {
  const { getFieldDecorator } = props.form;

  return (
    <Form>
      <Col span={24}>
        <FormItem label="调用地址">
          {getFieldDecorator('accessUrl', {
            rules: [],
          })(<Input />)}
        </FormItem>
      </Col>

      <Col span={24}>
        <FormItem label="请求类型">
          {getFieldDecorator('queryType', {
            rules: [],
          })(<Input />)}
        </FormItem>
      </Col>

      <Col span={24}>
        <FormItem label="返回类型">
          {getFieldDecorator('returnType', {
            rules: [],
          })(<Input />)}
        </FormItem>
      </Col>

      <Col span={24}>
        <FormItem label="调用示例">
          {getFieldDecorator('accessSample', {
            rules: [],
          })(<TextArea />)}
        </FormItem>
      </Col>

      <Col span={24}>
        <FormItem label="返回示例">
          {getFieldDecorator('returnSample', {
            rules: [],
          })(<TextArea />)}
        </FormItem>
      </Col>
    </Form>
  );
});

class OverviewDetail extends React.Component {
  constructor(props) {
    super(props);

    this.apiId = this.props.match.params.id;
    this.state = {
      fields: {
        apiName: {
          value: '',
        },
        accessUrl: {
          value: '',
        },
        queryType: {
          value: '',
        },
        returnType: {
          value: '',
        },
        accessSample: {
          value: '',
        },
        returnSample: {
          value: '',
        },
        errorCodeList: {
          value: [],
        },
      },
    };
    this.service = new OverviewDetailService();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getApiInfo(this.apiId);
  }

  getApiInfo(apiId) {
    this.service.getApiInfo(apiId).then((data) => {
      if (data.code === '2000') {
        const fields = {};
        if (data.data) {
          Object.keys(data.data).forEach((key) => {
            fields[key] = {
              value: data.data[key],
            };
          });
          this.setState({
            fields,
          });
        }
      }
    });
  }

  handleAdd() {
    const newData = {
      apiErrorCodeId: new Date().valueOf(),
      errorCode: 'code',
      errorDesc: 'desc',
    };

    const { fields } = this.state;
    fields.errorCodeList.value.push(newData);
    this.setState({
      fields: { ...fields },
    });
  }

  handleDelete(apiErrorCodeId) {
    const { fields } = this.state;
    let { value } = fields.errorCodeList;
    value = value.filter(e => e.apiErrorCodeId !== apiErrorCodeId);
    fields.errorCodeList.value = value;

    this.setState({
      fields: { ...fields },
    });
  }

  updateApiInfo(apiId, param) {
    this.service.updateApiInfo(apiId, param).then((data) => {
      if (data.code === '2000') {
        console.warn(data.data);
      }
    });
  }

  handleEdit(apiErrorCodeId) {
    const errorCodeList = [...this.state.fields.errorCodeList.value];
    const errorCodeItem = errorCodeList.filter(item => apiErrorCodeId === item.apiErrorCodeId)[0];
    if (errorCodeItem) {
      errorCodeItem.editable = true;
      const { fields } = this.state;
      fields.errorCodeList.value = errorCodeList;
      this.setState({ fields });
    }
  }

  handleCancel(apiErrorCodeId) {
    const errorCodeList = [...this.state.fields.errorCodeList.value];
    const errorCodeItem = errorCodeList.filter(item => apiErrorCodeId === item.apiErrorCodeId)[0];
    if (errorCodeItem) {
      errorCodeItem.editable = false;
      const { fields } = this.state;
      fields.errorCodeList.value = errorCodeList;
      this.setState({ fields });
    }
  }

  handleSave(errorCodeItem) {
    const errorCodeList = [...this.state.fields.errorCodeList.value].map((e) => {
      if (e.apiErrorCodeId === errorCodeItem.apiErrorCodeId) {
        errorCodeItem.editable = false;
        return errorCodeItem;
      }
      return e;
    });

    const { fields } = this.state;
    fields.errorCodeList.value = errorCodeList;

    this.setState({ fields });
  }

  handleFormChange(changeFields) {
    this.setState({
      fields: { ...this.state.fields, ...changeFields },
    });
  }

  handleSubmit() {
    const fieldsObj = this.state.fields;
    Object.keys(fieldsObj).forEach((key) => {
      fieldsObj[key] = fieldsObj[key].value;
    });
    this.updateApiInfo(this.apiId, fieldsObj);
  }

  render() {
    const { fields } = this.state;

    return (
      <div>
        <DetailForm {...fields} onChange={this.handleFormChange} />

        <Col span={24}>
          <FormItem label="错误Code">
            <CodeError
              handleAdd={this.handleAdd}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              onSave={this.handleSave}
              onCancel={this.handleCancel}
              data={this.state.fields.errorCodeList.value}
            />
          </FormItem>
        </Col>

        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={this.handleSubmit}>
            Save
          </Button>
        </Col>
      </div>
    );
  }
}

export default OverviewDetail;
