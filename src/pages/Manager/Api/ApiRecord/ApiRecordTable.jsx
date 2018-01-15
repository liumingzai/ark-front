import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: '接口ID',
    dataIndex: 'apiId',
    render: text => <a href="#a">{text}</a>,
  },
  {
    title: '接口名称',
    dataIndex: 'apiName',
  },
  {
    title: '用户ID',
    dataIndex: 'id',
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

function ApiRecordTable(props) {
  const { data } = props;
  let dataSource = [];

  if (data) {
    dataSource = data.map(e => ({
      key: e.id,
      apiId: e.apiId,
      apiName: e.apiName,
      id: e.id,
      accessUrl: e.accessUrl,
      dailyDate: e.dailyDate,
      accessTotal: e.accessTotal,
    }));
  }

  return <Table columns={columns} dataSource={dataSource} />;
}

export default ApiRecordTable;
