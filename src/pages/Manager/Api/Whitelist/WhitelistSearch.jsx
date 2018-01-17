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
      apiId: Form.createFormField({
        ...props.apiId,
        value: props.apiId.value,
      }),
      dailyDate: Form.createFormField({
        ...props.dailyDate,
        value: props.dailyDate.value,
      }),
      clientIp: Form.createFormField({
        ...props.clientIp,
        value: props.clientIp.value,
      }),
      url: Form.createFormField({
        ...props.url,
        value: props.url.value,
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

      <FormItem label="API ID">
        {getFieldDecorator('apiId', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="Daily Date">
        {getFieldDecorator('dailyDate', {
          rules: [],
        })(<DatePicker />)}
      </FormItem>

      <FormItem label="Client IP">
        {getFieldDecorator('clientIp', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="URL">
        {getFieldDecorator('url', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="Search">
        <Button onClick={props.onSearch}>Search</Button>
      </FormItem>
    </Form>
  );
});

class WhitelistSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        uid: {
          value: '',
        },
        apiId: {
          value: '',
        },
        clientIp: {
          value: '',
        },
        url: {
          value: '',
        },
        dailyDate: {
          value: null,
        },
      },
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

export default WhitelistSearch;
