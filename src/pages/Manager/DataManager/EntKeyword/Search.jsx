import React from 'react';
import { Row, Col, Button, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

// function CustomSelect(props) {
//   return (
//     <Select
//       style={{ width: 200 }}
//       placeholder="Select a province"
//     >
//       {props.provinces
//         ? props.provinces.map(e => (
//           <Option key={e} value={e}>
//             {e}
//           </Option>
//           ))
//         : null}
//     </Select>
//   );
// }

const SearchForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      keyword: Form.createFormField({
        ...props.keyword,
        value: props.keyword.value,
      }),
      province: Form.createFormField({
        ...props.province,
        value: props.province.value,
      }),
    };
  },
  onValuesChange(_, value) {
    console.warn(value);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  console.warn(props);

  return (
    <Form layout="inline">
      <FormItem>
        {getFieldDecorator('keyword', {
          rules: [],
        })(<Input style={{ marginRight: '10px' }} placeholder="关键字" />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('province', {
          rules: [],
        })(
          <Select style={{ width: 200 }} placeholder="Select a province">
            {props.provinces
              ? props.provinces.map(e => (
                <Option key={e} value={e}>
                  {e}
                </Option>
                ))
              : null}
          </Select>,
        )}
      </FormItem>
    </Form>
  );
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        keyword: {
          value: null,
        },
        province: {
          value: null,
        },
      },
      provinces: [],
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      provinces: nextProps.provinces,
    });
  }

  handleSearch() {
    // this.props.onSearch();
    console.warn(this.state);
  }

  handleFormChange(changeFields) {
    this.setState({
      fields: { ...this.state.fields, ...changeFields },
    });
  }

  render() {
    const { fields } = this.state;

    return (
      <section>
        <SearchForm {...fields} provinces={this.state.provinces} onChange={this.handleFormChange} />
        <Row>
          <Col span={12} style={{ float: 'right', marginTop: '8px', textAlign: 'right' }}>
            <Button style={{ marginRight: '10px' }} onClick={this.props.onDownload}>
              下载模板
            </Button>
            <Button type="primary" style={{ marginRight: '10px' }}>
              批量新增
            </Button>
            <Button type="primary" style={{ marginRight: '10px' }}>
              新增
            </Button>
            <Button type="primary" onClick={this.handleSearch}>
              查询
            </Button>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Search;
