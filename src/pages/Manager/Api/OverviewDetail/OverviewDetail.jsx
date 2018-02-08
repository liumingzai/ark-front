import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Col, Button, Switch, message, Breadcrumb } from 'antd';
import CodeError from './CodeError';
import RequestBody from './RequestBody';
import OverviewDetailService from './OverviewDetailService';

const { TextArea } = Input;
const FormItem = Form.Item;
function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/manager/api/overview">数据接口</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>接口详情</Breadcrumb.Item>
    </Breadcrumb>
  );
}

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
        paramList: {
          header: {
            value: [],
          },
          bodys: {
            value: [],
          },
          querys: {
            value: [],
          },
        },
        publish: {
          value: true,
        },
      },
    };
    this.service = new OverviewDetailService();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleParamListAdd = this.handleParamListAdd.bind(this);
    this.handleHeaderAdd = this.handleHeaderAdd.bind(this);
    this.handleQueryAdd = this.handleQueryAdd.bind(this);
    this.handleBodyAdd = this.handleBodyAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handlePublishChange = this.handlePublishChange.bind(this);
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
            if (key !== 'paramList') {
              // ignore paramList
              fields[key] = {
                value: data.data[key],
              };
            } else {
              const params = {
                header: {
                  value: [],
                },
                bodys: {
                  value: [],
                },
                querys: {
                  value: [],
                },
              };

              data.data[key].forEach((e) => {
                switch (e.argumentType) {
                  case 'header':
                    params.header.value.push(e);
                    break;
                  case 'querys':
                    params.querys.value.push(e);
                    break;
                  case 'bodys':
                  default:
                    params.bodys.value.push(e);
                }
              });

              fields[key] = params;
            }
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

  handleParamListAdd(type) {
    const newData = {
      apiQueryId: new Date().valueOf(),
      argumentType: type,
      queryColumnName: ' ',
      queryColumnType: ' ',
      queryOption: ' ',
      queryColumnDesc: ' ',
    };

    const { fields } = this.state;
    fields.paramList[type].value.push(newData);
    this.setState({
      fields: { ...fields },
    });
  }

  handleHeaderAdd() {
    this.handleParamListAdd('header');
  }

  handleBodyAdd() {
    this.handleParamListAdd('bodys');
  }

  handleQueryAdd() {
    this.handleParamListAdd('querys');
  }

  handleDelete(param) {
    const { fields } = this.state;
    let value = param.childType
      ? [...this.state.fields[param.type][param.childType].value]
      : [...this.state.fields[param.type].value];
    value = value.filter(e => e[param.key] !== param.value);

    if (param.childType) {
      fields[param.type][param.childType].value = value;
    } else {
      fields[param.type].value = value;
    }

    this.setState({
      fields: { ...fields },
    });
  }

  updateApiInfo(apiId, param) {
    this.service.updateApiInfo(apiId, param).then((data) => {
      if (data.code === '2000') {
        message.success('Update success');
      }
    });
  }

  /**
   * edit
   *
   * In order to support codeerror and paramlist.
   * @param {key: string, value: string, type: string, childType: string } param
   * @memberof OverviewDetail
   */
  handleEdit(param) {
    const value = param.childType
      ? [...this.state.fields[param.type][param.childType].value]
      : [...this.state.fields[param.type].value];
    const valueItem = value.filter(item => param.value === item[param.key])[0];
    if (valueItem) {
      valueItem.editable = true;
      const { fields } = this.state;
      if (param.childType) {
        fields[param.type][param.childType].value = value;
      } else {
        fields[param.type].value = value;
      }
      this.setState({ fields });
    }
  }

  handleCancel(param) {
    const value = param.childType
      ? [...this.state.fields[param.type][param.childType].value]
      : [...this.state.fields[param.type].value];
    const valueItem = value.filter(item => param.value === item[param.key])[0];
    if (valueItem) {
      valueItem.editable = false;
      const { fields } = this.state;
      if (param.childType) {
        fields[param.type][param.childType].value = value;
      } else {
        fields[param.type].value = value;
      }
      this.setState({ fields });
    }
  }

  handleSave(param) {
    const { data } = param;
    const value = (param.childType
      ? [...this.state.fields[param.type][param.childType].value]
      : [...this.state.fields[param.type].value]
    ).map((e) => {
      if (e.apiErrorCodeId === data.apiErrorCodeId) {
        data.editable = false;
        return data;
      }
      return e;
    });

    const { fields } = this.state;
    if (param.childType) {
      fields[param.type][param.childType].value = value;
    } else {
      fields[param.type].value = value;
    }

    this.setState({ fields });
  }

  handleFormChange(changeFields) {
    this.setState({
      fields: { ...this.state.fields, ...changeFields },
    });
  }

  handlePublishChange(checked) {
    const { fields } = this.state;

    fields.publish.value = checked ? 1 : 0;

    this.setState({
      fields,
    });
  }

  handleSubmit() {
    const fieldsObj = { ...this.state.fields };
    Object.keys(fieldsObj).forEach((key) => {
      if (key !== 'paramList') {
        fieldsObj[key] = fieldsObj[key].value;
      } else {
        fieldsObj[key] = [].concat(
          fieldsObj[key].header.value,
          fieldsObj[key].bodys.value,
          fieldsObj[key].querys.value,
        );
      }
    });
    this.updateApiInfo(this.apiId, fieldsObj);
  }

  render() {
    const { fields } = this.state;

    return (
      <div>
        <BreadNav />
        <DetailForm {...fields} onChange={this.handleFormChange} />

        <Col span={24}>
          <FormItem label="Header(header)">
            <Button className="editable-add-btn" onClick={this.handleHeaderAdd}>
              Add
            </Button>
            <RequestBody
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
              onSave={this.handleSave}
              onCancel={this.handleCancel}
              data={this.state.fields.paramList.header.value}
            />
          </FormItem>
        </Col>

        <Col span={24}>
          <FormItem label="Header(query)">
            <Button className="editable-add-btn" onClick={this.handleQueryAdd}>
              Add
            </Button>
            <RequestBody
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
              onSave={this.handleSave}
              onCancel={this.handleCancel}
              data={this.state.fields.paramList.querys.value}
            />
          </FormItem>
        </Col>

        <Col span={24}>
          <FormItem label="Header(body)">
            <Button className="editable-add-btn" onClick={this.handleBodyAdd}>
              Add
            </Button>
            <RequestBody
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
              onSave={this.handleSave}
              onCancel={this.handleCancel}
              data={this.state.fields.paramList.bodys.value}
            />
          </FormItem>
        </Col>

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

        <Col span={24}>
          <span style={{ marginRight: '10px' }}>发布状态</span>
          <Switch
            checkedChildren="发布"
            unCheckedChildren="保存"
            onChange={this.handlePublishChange}
            checked={this.state.fields.publish.value === 1}
          />
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
