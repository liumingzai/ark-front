import React from 'react';
import { Form, Input, Col, Button, Table, Popconfirm } from 'antd';
import OverviewDetailService from './OverviewDetailService';

const { TextArea } = Input;
const FormItem = Form.Item;

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);

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

  // format data source
  const dataSource = [];
  props.errorCodeList.value.forEach((e) => {
    dataSource.push({
      key: e.apiErrorCodeId,
      errorCode: e.errorCode,
      errorDesc: e.errorDesc,
    });
  });

  const columns = [
    {
      title: 'Code',
      dataIndex: 'errorCode',
      width: '20%',
    },
    {
      title: '说明',
      dataIndex: 'errorDesc',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '20%',
      render: (text, record) =>
        (dataSource.length > 0 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => props.onDelete(record.key)}>
            <Button>Delete</Button>
          </Popconfirm>
        ) : null),
    },
  ];

  return (
    <Form>
      <Col span={24}>
        {/* <FormItem label="接口名称">
          {getFieldDecorator('apiName', {
            rules: [],
          })(<Input />)}
        </FormItem> */}
      </Col>

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

      <Col span={24}>
        <FormItem label="错误Code">
          <Button className="editable-add-btn" onClick={props.handleAdd}>
            Add
          </Button>
          <Table bordered dataSource={dataSource} columns={columns} />
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

  update(apiId, param) {
    this.service.updateApiInfo(apiId, param).then((data) => {
      if (data.code === '2000') {
        console.warn(data.data);
      }
    });
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  render() {
    const { fields } = this.state;

    return (
      <div>
        <DetailForm {...fields} handleAdd={this.handleAdd} onDelete={this.handleDelete} />
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary">Save</Button>
        </Col>
      </div>
    );
  }
}

export default OverviewDetail;
