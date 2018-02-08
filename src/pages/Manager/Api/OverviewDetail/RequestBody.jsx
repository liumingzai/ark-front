import React from 'react';
import { Button, Popconfirm, Input, Table, Select, Switch } from 'antd';

const { Option } = Select;

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);

const EditableSelectCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Select style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e)}>
        <Option value="header">Header</Option>
        <Option value="querys">Query</Option>
        <Option value="bodys">Body</Option>
      </Select>
    ) : (
      value
    )}
  </div>
);

const EditableSwitchCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Switch
        checkedChildren="Y"
        unCheckedChildren="N"
        checked={value}
        onChange={e => onChange(e)}
      />
    ) : (
      value
    )}
  </div>
);

class RequestBody extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = null;
    const columns = [
      {
        title: '参数类型',
        dataIndex: 'argumentType',
        width: '20%',
        render: (text, record) => this.renderSelectColumns(text, record, 'argumentType'),
      },
      {
        title: '参数名称',
        dataIndex: 'queryColumnName',
        render: (text, record) => this.renderColumns(text, record, 'queryColumnName'),
      },
      {
        title: '参数基本类型',
        dataIndex: 'queryColumnType',
        render: (text, record) => this.renderColumns(text, record, 'queryColumnType'),
      },
      {
        title: '是否必须',
        dataIndex: 'queryOption',
        render: (text, record) => this.renderSwitchColumns(text, record, 'queryOption'),
      },
      {
        title: '参数描述',
        dataIndex: 'queryColumnDesc',
        render: (text, record) => this.renderColumns(text, record, 'queryColumnDesc'),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => (
          <div>
            <Popconfirm
              title="您确定要删除吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button>删除</Button>
            </Popconfirm>
          </div>
        ),
      },
    ];

    this.state = {
      dataSource,
      columns,
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.doSubmit) {
      const dataSource = [];
      nextProps.data.forEach((e) => {
        dataSource.push({
          key: e.apiQueryId,
          editable: e.editable || false,
          apiQueryId: e.apiQueryId,
          argumentType: e.argumentType,
          queryColumnName: e.queryColumnName,
          queryColumnType: e.queryColumnType,
          queryOption: e.queryOption,
          queryColumnDesc: e.queryColumnDesc,
        });
      });

      this.setState({
        dataSource,
      });
    } else {
      this.props.syncData({ paramList: this.state.dataSource });
    }
  }

  handleChange(value, key, column) {
    const newData = this.state.dataSource.map((e) => {
      if (key === e.key) {
        e[column] = value;
      }

      return e;
    });

    this.setState({ dataSource: newData });
  }

  handleAdd() {
    const { dataSource } = this.state;
    dataSource.push({
      key: new Date().valueOf(),
      argumentType: 'header', // header, querys, bodys
      queryColumnName: null,
      queryColumnType: null,
      queryOption: null,
      queryColumnDesc: null,
    });

    this.setState({
      dataSource,
    });
  }

  handleDelete(key) {
    const dataSource = this.state.dataSource.filter(e => key !== e.key);
    this.setState({
      dataSource,
    });
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={this.props.userType === 1}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  renderSelectColumns(text, record, column) {
    return (
      <EditableSelectCell
        editable={this.props.userType === 1}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  renderSwitchColumns(text, record, column) {
    return (
      <EditableSwitchCell
        editable={this.props.userType === 1}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.userType === 1 ? (
          <Button className="editable-add-btn" onClick={this.handleAdd}>
            新增
          </Button>
        ) : null}
        <Table
          bordered
          locale={{ emptyText: '暂无数据' }}
          pagination={false}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default RequestBody;
