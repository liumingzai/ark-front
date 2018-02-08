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

    const dataSource = null;
    const columns = [
      {
        title: '错误码',
        dataIndex: 'errorCode',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'errorCode'),
      },
      {
        title: '说明',
        dataIndex: 'errorDesc',
        render: (text, record) => this.renderColumns(text, record, 'errorDesc'),
      },
    ];

    // 管理员有删除操作
    if (this.props.userType) {
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        render: (text, record) => (
          <div>
            <Popconfirm
              okText="确定"
              cancelText="取消"
              title="您确定要删除吗？"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button>删除</Button>
            </Popconfirm>
          </div>
        ),
      });
    }

    this.state = {
      dataSource,
      columns,
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.doSubmit) {
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

      this.setState({
        dataSource,
      });
    } else {
      this.props.syncData({ errorCodeList: this.state.dataSource });
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
      errorCode: null,
      errorDesc: null,
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

export default CodeError;
