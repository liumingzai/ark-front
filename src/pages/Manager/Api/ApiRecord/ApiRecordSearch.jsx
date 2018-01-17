import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';

const FormItem = Form.Item;
const SearchForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      uid: Form.createFormField({
        ...props.uid,
        value: props.uid.value,
      }),
      apiName: Form.createFormField({
        ...props.apiName,
        value: props.apiName.value,
      }),
      url: Form.createFormField({
        ...props.url,
        value: props.url.value,
      }),
      startDate: Form.createFormField({
        ...props.startDate,
        value: props.startDate.value,
      }),
      endDate: Form.createFormField({
        ...props.endDate,
        value: props.endDate.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.warn(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <FormItem label="UID">
        {getFieldDecorator('uid', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="Api Name">
        {getFieldDecorator('apiName', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="URL">
        {getFieldDecorator('url', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="Start date">
        {getFieldDecorator('startDate', {
          rules: [],
        })(<DatePicker />)}
      </FormItem>

      <FormItem label="End date">
        {getFieldDecorator('endDate', {
          rules: [],
        })(<DatePicker />)}
      </FormItem>

      <FormItem label="Search">
        <Button onClick={props.onSearch}>Search</Button>
      </FormItem>
    </Form>
  );
});

class ApiRecordSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        uid: {
          value: '',
        },
        apiName: {
          value: '',
        },
        url: {
          value: '',
        },
        startDate: {
          value: null,
        },
        endDate: {
          value: null,
        },
      },
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleSearch() {
    const data = this.state.fields;
    this.props.onSearch(data);
  }

  handleFormChange(changedFields) {
    this.setState({
      fields: { ...this.state.fields, ...changedFields },
    });
  }

  render() {
    const { fields } = this.state;

    return (
      <div>
        <SearchForm {...fields} onChange={this.handleFormChange} onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default ApiRecordSearch;
