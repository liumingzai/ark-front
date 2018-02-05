import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddNew extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.warn('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    // Only show error after a field is touched.
    const keywordError = isFieldTouched('keyword') && getFieldError('keyword');
    const provinceError = isFieldTouched('province') && getFieldError('province');

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem validateStatus={keywordError ? 'error' : ''} help={keywordError || ''}>
          {getFieldDecorator('keyword', {
            rules: [{ required: true, message: 'Please input keyword!' }],
          })(<Input placeholder="Please input keyword" />)}
        </FormItem>

        <FormItem validateStatus={provinceError ? 'error' : ''} help={provinceError || ''}>
          {getFieldDecorator('province', {
            rules: [{ required: true, message: 'Please select province' }],
          })(
            <Select style={{ width: 200 }} placeholder="Please select province ">
              {this.props.provinces
                ? this.props.provinces.map(e => (
                  <Option key={e} value={e}>
                    {e}
                  </Option>
                  ))
                : null}
            </Select>,
          )}
        </FormItem>

        {/* TODO：优先级 */}
        {/* <FormItem>

        </FormItem> */}

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{ marginRight: 10 }}
          >
            Submit
          </Button>
          <Button htmlType="button" onClick={this.props.onCancel}>
            Cancel
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddNew = Form.create()(AddNew);

export default WrappedAddNew;
