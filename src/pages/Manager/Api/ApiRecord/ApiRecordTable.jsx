import React from 'react';
import { Table } from 'antd';

const commonColumns = [
  {
    title: '接口名称',
    dataIndex: 'apiName',
  },
  {
    title: '接入URL',
    dataIndex: 'accessUrl',
  },
  {
    title: '日期',
    dataIndex: 'dailyDate',
  },
  {
    title: '访问数量',
    dataIndex: 'accessTotal',
  },
];

const adminColumns = [
  {
    title: 'UID',
    dataIndex: 'uid',
    render: text => <a href="#a">{text}</a>,
  },
  ...commonColumns,
];

function ApiRecordTable(props) {
  let columns;
  if (props.isAdmin) {
    columns = adminColumns;
  } else {
    columns = commonColumns;
  }

  const { data, onChange, pageConf } = props;
  let dataSource = [];
  const pagination = {
    defaultCurrent: 1,
    total: pageConf.total,
    pageSize: pageConf.pageSize,
    hideOnSinglePage: true,
    onChange,
  };

  if (data) {
    dataSource = data.map(e => ({
      key: e.id,
      uid: e.uid,
      apiName: e.apiName,
      accessUrl: e.accessUrl,
      dailyDate: e.dailyDate,
      accessTotal: e.accessTotal,
    }));
  }

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      style={{ marginTop: 10 }}
    />
  );
}

export default ApiRecordTable;
