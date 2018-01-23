import React from 'react';
import { Button, Table, Popconfirm, Input } from 'antd';

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);

class CodeError extends React.Component {
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
        key: e.apiErrorCodeId,
        apiErrorCodeId: e.apiErrorCodeId,
        errorCode: e.errorCode,
        errorDesc: e.errorDesc,
        editable: e.editable || false,
      });
    });
    const columns = [
      {
        title: 'Code',
        dataIndex: 'errorCode',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'errorCode'),
      },
      {
        title: '说明',
        dataIndex: 'errorDesc',
        render: (text, record) => this.renderColumns(text, record, 'errorDesc'),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        width: '20%',
        render: (text, record) => {
          const tmp =
            record.editable === true ? (
              <span>
                <Button onClick={() => this.props.onSave(record)}>Save</Button>
                <Button onClick={() => this.props.onCancel(record.key)}>Cancel</Button>
              </span>
            ) : (
              <Button onClick={() => this.props.onEdit(record.key)}>Edit</Button>
            );

          return dataSource.length > 0 ? (
            <div>
              {tmp}
              <Popconfirm title="Sure to delete?" onConfirm={() => this.props.onDelete(record.key)}>
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
        <Button className="editable-add-btn" onClick={this.props.handleAdd}>
          Add
        </Button>
        <Table bordered dataSource={this.state.dataSource} columns={this.state.columns} />
      </div>
    );
  }
}

export default CodeError;
