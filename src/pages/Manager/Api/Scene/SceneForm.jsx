import React from 'react';
import { Form, Input, Col, Row, Switch, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

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
      userToken: Form.createFormField({
        ...props.userToken,
        value: props.userToken.value,
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
      <Row>
        <Col span={8} style={{ marginRight: '10px' }}>
          <FormItem label="Scene name">
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
            })(<Switch
              checkedChildren="有效"
              unCheckedChildren="无效"
              checked={props.active.value}
            />)}
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem label="User token">
            {getFieldDecorator('userToken', {
              rules: [{ required: true, message: 'UserToken is required!' }],
            })(<Input />)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});

class SceneForm extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      data,
      fields: {
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
          value: data.active === 'Y',
        },
        userToken: {
          value: data.userToken,
        },
      },
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      fields: {
        applicationName: {
          value: nextProps.data.applicationName,
        },
        updateTime: {
          value: nextProps.data.updateTime,
        },
        appMd5: {
          value: nextProps.data.appMd5,
        },
        wlMaxCount: {
          value: nextProps.data.wlMaxCount,
        },
        description: {
          value: nextProps.data.description,
        },
        wlContent: {
          value: nextProps.data.wlContent,
        },
        active: {
          value: nextProps.data.active === 'Y',
        },
        userToken: {
          value: nextProps.data.userToken,
        },
      },
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.fields);
  }

  handleDelete() {
    const { appMd5, accountId } = this.state.data;
    this.props.onDelete(appMd5, accountId);
  }

  handleFormChange(changeFields) {
    this.setState({
      fields: { ...this.state.fields, ...changeFields },
    });
  }

  render() {
    const { fields } = this.state;
    return (
      <div style={{ padding: '10px', backgroundColor: '#fff', marginTop: '10px' }}>
        <CustomForm {...fields} onChange={this.handleFormChange} />
        <Row>
          <Col span={16} style={{ textAlign: 'center' }}>
            <Button style={{ marginRight: '10px' }} onClick={this.handleSubmit} type="primary">
              Save
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={this.handleDelete} type="danger">
              Delete
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SceneForm;
