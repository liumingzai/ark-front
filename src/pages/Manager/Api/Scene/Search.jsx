import React from 'react';
import { Input, Form, Button } from 'antd';

const FormItem = Form.Item;

const CustomForm = Form.create({
  onFieldsChange(props, changedField) {
    props.onChange(changedField);
  },
  mapPropsToFields(props) {
    return {
      uid: Form.createFormField({
        ...props,
        value: props.uid.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.warn(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmit(values);
      }
    });
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('uid', {
          rules: [],
        })(<Input placeholder="Please input UID" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </FormItem>
    </Form>
  );
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        uid: {
          value: null,
        },
      },
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(changedFields) {
    this.setState({
      fields: { ...this.state.fields, ...changedFields },
    });
  }

  handleSubmit(values) {
    this.props.onSearch(values);
  }

  render() {
    const { fields } = this.state;
    return <CustomForm {...fields} onChange={this.handleFormChange} onSubmit={this.handleSubmit} />;
  }
}

export default Search;
