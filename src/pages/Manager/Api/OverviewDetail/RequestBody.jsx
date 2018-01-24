import React from 'react';
import { Button, Popconfirm, Input, Table } from 'antd';

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);

class RequestBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      columns: null,
    };
  }

  componentWillReceiveProps(nextProps) {
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

    const columns = [
      {
        title: '参数类型',
        dataIndex: 'argumentType',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'argumentType'),
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
        render: (text, record) => this.renderColumns(text, record, 'queryOption'),
      },
      {
        title: '参数描述',
        dataIndex: 'queryColumnDesc',
        render: (text, record) => this.renderColumns(text, record, 'queryColumnDesc'),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        width: '20%',
        render: (text, record) => {
          const param = {
            key: 'apiQueryId',
            value: record.key,
            type: 'paramList',
            childType: record.argumentType,
            data: record,
          };
          const tmp =
            record.editable === true ? (
              <span>
                <Button onClick={() => this.props.onSave(param)}>Save</Button>
                <Button onClick={() => this.props.onCancel(param)}>Cancel</Button>
              </span>
            ) : (
              <Button onClick={() => this.props.onEdit(param)}>Edit</Button>
            );

          return dataSource.length > 0 ? (
            <div>
              {tmp}
              <Popconfirm title="Sure to delete?" onConfirm={() => this.props.onDelete(param)}>
                <Button>Delete</Button>
              </Popconfirm>
            </div>
          ) : null;
        },
      },
    ];

    this.setState({
      dataSource,
      columns,
    });
  }

  handleChange(value, key, column) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ dataSource: newData });
    }
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  render() {
    return (
      <div>
        <Table
          bordered
          pagination={false}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default RequestBody;
