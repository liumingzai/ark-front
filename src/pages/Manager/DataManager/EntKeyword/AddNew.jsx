import React from 'react';
import { Table, Input, Button, Popconfirm, Select, Switch, message } from 'antd';
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

const EditableSelectCell = ({ provinces, onChange }) => (
  <Select onChange={e => onChange(e)} defaultValue="北京">
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

class AddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: 1,
          keyword: '',
          province: '北京',
          priority: true,
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
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          (this.state.data.length > 1 ? (
            <Popconfirm
              title="确定删除吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => this.onDelete(record.key)}
            >
              <Button>删除</Button>
            </Popconfirm>
          ) : null),
      },
    ];

    this.service = new Service();
    this.onDelete = this.onDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.addKeywordInfo = this.addKeywordInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onSubmit) {
      const data = this.state.data.map(e => ({
        keyword: e.keyword,
        province: e.province,
        priority: e.priority ? 1 : 0,
      }));
      this.addKeywordInfo(data);
    }
  }

  onDelete(key) {
    const dataSource = [...this.state.data];
    this.setState({ data: dataSource.filter(item => item.key !== key) });
  }

  addKeywordInfo(param) {
    this.service.addKeywordInfo(param).then((data) => {
      if (data.code === '2000') {
        message.success('添加成功');
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

  handleAdd() {
    const { data } = this.state;
    const newData = {
      key: data.length + 1,
      keyword: '',
      province: '北京',
      priority: true,
    };

    this.setState({
      data: [...data, newData],
    });
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
        <Button type="primary" style={{ marginBottom: 10 }} onClick={this.handleAdd}>
          新增
        </Button>
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

export default AddNew;
