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
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <FormItem label="用户ID">
        {getFieldDecorator('uid', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="接口名称">
        {getFieldDecorator('apiName', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="客户端IP">
        {getFieldDecorator('clientIp', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="访问地址">
        {getFieldDecorator('url', {
          rules: [],
        })(<Input />)}
      </FormItem>

      <FormItem label="访问日期">
        {getFieldDecorator('dailyDate', {
          rules: [],
        })(<DatePicker />)}
      </FormItem>

      <FormItem>
        <Button onClick={props.onSearch}>搜索</Button>
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
          value: props.queryParam.uid || '',
        },
        apiName: {
          value: props.queryParam.apiName || '',
        },
        clientIp: {
          value: props.queryParam.clientIp || '',
        },
        url: {
          value: props.queryParam.url || '',
        },
        dailyDate: {
          value: props.queryParam.dailyDate || null,
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
