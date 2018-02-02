import React from 'react';
import { Form, Input, Col, Row, Switch } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

/**
 * 初始化stateData
 *
 * @param {any} props
 * @returns
 */
function initStateData(props) {
  const { data } = props;
  return {
    applicationName: {
      value: data.applicationName,
    },
    updateTime: {
      value: data.updateTime,
    },
    appMd5: {
      value: data.appMd5,
    },
    wlMaxCount: {
      value: data.wlMaxCount,
    },
    description: {
      value: data.description,
    },
    wlContent: {
      value: data.wlContent,
    },
    active: {
      value: data.active,
    },
  };
}

const CustomForm = Form.create({
  onFieldsChange(props, changedDields) {
    props.onChange(changedDields);
  },
  mapPropsToFields(props) {
    return {
      applicationName: Form.createFormField({
        ...props.applicationName,
        value: props.applicationName.value,
      }),
      updateTime: Form.createFormField({
        ...props.updateTime,
        value: props.updateTime.value,
      }),
      appMd5: Form.createFormField({
        ...props.appMd5,
        value: props.appMd5.value,
      }),
      wlMaxCount: Form.createFormField({
        ...props.wlMaxCount,
        value: props.wlMaxCount.value,
      }),
      description: Form.createFormField({
        ...props.description,
        value: props.description.value,
      }),
      wlContent: Form.createFormField({
        ...props.wlContent,
        value: props.wlContent.value,
      }),
      active: Form.createFormField({
        ...props.active,
        value: props.active.value,
      }),
    };
  },
  onValuesChange(props, value) {
    props.syncData(value);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form>
      <Row>
        <Col span={8} style={{ marginRight: '10px' }}>
          <FormItem label="场景名称">
            {getFieldDecorator('applicationName', {
              rules: [{ required: true, message: 'Application name is required!' }],
            })(<Input />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="更新时间">
            {getFieldDecorator('updateTime', {
              rules: [],
            })(<Input disabled readOnly />)}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span={8} style={{ marginRight: '10px' }}>
          <FormItem label="场景ID">
            {getFieldDecorator('appMd5', {
              rules: [],
            })(<Input readOnly disabled />)}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="最大白名单限制">
            {getFieldDecorator('wlMaxCount', {
              rules: [],
            })(<Input readOnly disabled />)}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span={8} style={{ marginRight: '10px' }}>
          <FormItem label="场景描述">
            {getFieldDecorator('description', {
              rules: [],
            })(<TextArea />)}
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem label="白名单">
            {getFieldDecorator('wlContent', {
              rules: [],
            })(<TextArea />)}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <FormItem label="是否有效">
            {getFieldDecorator('active', {
              rules: [],
            })(
              <Switch
                checkedChildren="有效"
                unCheckedChildren="无效"
                checked={props.active.value}
              />,
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});

class SceneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: initStateData(props),
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fields: initStateData(nextProps),
    });
  }

  handleFormChange(changeFields) {
    this.setState({
      fields: { ...this.state.fields, ...changeFields },
    });
  }

  render() {
    const { fields } = this.state;
    return (
      <div style={{ padding: '10px', marginTop: '10px' }}>
        <CustomForm {...fields} onChange={this.handleFormChange} syncData={this.props.syncData} />
      </div>
    );
  }
}

export default SceneForm;
