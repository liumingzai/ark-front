import React from 'react';
import { Table, Input, Select, Switch, message } from 'antd';
import Service from './EntKeywordService';

const { Option } = Select;

const EditableInputCell = ({ value, onChange }) => (
  <Input
    style={{ margin: '-5px 0' }}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder="请输入关键字"
  />
);

const EditableSelectCell = ({ provinces, onChange, defaultValue }) => (
  <Select onChange={e => onChange(e)} value={defaultValue || '北京'}>
    {provinces
      ? provinces.map(e => (
        <Option key={e} value={e}>
          {e}
        </Option>
        ))
      : null}
  </Select>
);

const EditableSwitchCell = ({ value, onChange }) => (
  <Switch checkedChildren="高" unCheckedChildren="低" checked={value} onChange={onChange} />
);

class EditNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: this.props.data.id,
          key: this.props.data.key,
          keyword: this.props.data.keyword,
          province: this.props.data.province || '北京',
          priority: this.props.data.priority === 1,
        },
      ],
    };
    this.columns = [
      {
        title: '关键字',
        dataIndex: 'keyword',
        width: '30%',
        render: (text, record) => this.renderColumns(text, record, 'keyword'),
      },
      {
        title: '省份',
        dataIndex: 'province',
        render: (text, record) => this.renderSelectColumns(text, record, 'province'),
      },
      {
        title: '优先级',
        dataIndex: 'priority',
        render: (text, record) => this.renderPriorityColumns(text, record, 'priority'),
      },
    ];

    this.service = new Service();
    this.updateKeywordInfo = this.updateKeywordInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onSubmit) {
      const data = {
        id: this.state.data[0].id,
        keyword: this.state.data[0].keyword,
        province: this.state.data[0].province,
        priority: this.state.data[0].priority ? 1 : 0,
      };
      this.updateKeywordInfo(data);
    }
  }

  updateKeywordInfo(param) {
    this.service.updateKeywordInfo(param).then((data) => {
      if (data.code === '2000') {
        message.success('编辑成功');
        this.props.onCompleted();
      }
    });
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

  renderColumns(text, record, column) {
    return (
      <EditableInputCell
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  renderSelectColumns(text, record, column) {
    return (
      <EditableSelectCell
        defaultValue={text}
        provinces={this.props.provinces}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  renderPriorityColumns(text, record, column) {
    return (
      <EditableSwitchCell
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  render() {
    const pagination = false;
    return (
      <section>
        <Table
          bordered
          pagination={pagination}
          dataSource={this.state.data}
          columns={this.columns}
        />
      </section>
    );
  }
}

export default EditNew;
