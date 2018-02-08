import React from 'react';
import { Input, Form, Col } from 'antd';

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
})((props) => {
  const { getFieldDecorator } = props.form;

  return (
    <Form>
      <Col span={24}>
        <FormItem label="调用地址">
          {getFieldDecorator('accessUrl', {
            rules: [],
          })(
            <Input
              readOnly={!props.canEdit}
              placeholder="例如：http://api.proudark.com/ark-portal/kpi/getByRegion?region={地区}pageSize={每页条数}&pageNum={页码}&uid={uid}&appId={场景ID}&token={用户token}"
            />,
          )}
        </FormItem>
      </Col>

      <Col span={24}>
        <FormItem label="请求类型">
          {getFieldDecorator('queryType', {
            rules: [],
          })(<Input readOnly={!props.canEdit} placeholder="例如：GET" />)}
        </FormItem>
      </Col>

      <Col span={24}>
        <FormItem label="返回类型">
          {getFieldDecorator('returnType', {
            rules: [],
          })(<Input readOnly={!props.canEdit} placeholder="例如：JSON" />)}
        </FormItem>
      </Col>

      <Col span={24}>
        <FormItem label="调用示例">
          {getFieldDecorator('accessSample', {
            rules: [],
          })(<TextArea readOnly={!props.canEdit} />)}
        </FormItem>
      </Col>

      <Col span={24}>
        <FormItem label="返回示例">
          {getFieldDecorator('returnSample', {
            rules: [],
          })(<TextArea readOnly={!props.canEdit} />)}
        </FormItem>
      </Col>
    </Form>
  );
});

class CommonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.props.fields,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.doSubmit) {
      this.setState({
        fields: { ...nextProps.fields },
      });
    } else {
      this.props.syncData({ fields: this.state.fields });
    }
  }

  /**
   * 表单实时更新同步
   *
   * @param {any} changeFields
   * @memberof CommonForm
   */
  handleFormChange(changeFields) {
    const fields = { ...this.state.fields, ...changeFields };
    this.setState({
      fields,
    });
  }

  render() {
    const { fields } = this.state;
    return (
      <DetailForm
        {...fields}
        canEdit={this.props.userType === 1}
        onChange={this.handleFormChange}
      />
    );
  }
}

export default CommonForm;
