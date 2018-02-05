import React from 'react';
import { Row, Col, Button, Form, Input, Select, Upload, Icon, message } from 'antd';

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
})((props) => {
  const { getFieldDecorator } = props.form;

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
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      provinces: nextProps.provinces,
    });
  }

  handleSearch() {
    const { keyword: { value: keyword }, province: { value: province } } = this.state.fields;
    this.props.onSearch({ keyword, province });
  }

  handleFormChange(changeFields) {
    this.setState({
      fields: { ...this.state.fields, ...changeFields },
    });
  }

  render() {
    const { fields } = this.state;
    const uploadProps = {
      name: 'upload',
      action: 'http://192.168.1.151/ark-portal/dataManage/uploadKeywordInfo',
      withCredentials: true,
      listType: 'text',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.warn(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <section>
        <SearchForm {...fields} provinces={this.state.provinces} onChange={this.handleFormChange} />
        <Row>
          <Col span={12} style={{ float: 'right', marginTop: '8px', textAlign: 'right' }}>
            <Button type="primary" onClick={this.handleSearch} style={{ marginRight: '10px' }}>
              查询
            </Button>
            <Button type="primary" style={{ marginRight: '10px' }} onClick={this.props.onAddNew}>
              新增
            </Button>
            <Button style={{ marginRight: '10px' }} onClick={this.props.onDownload}>
              下载模板
            </Button>
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> 批量新增
              </Button>
            </Upload>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Search;
