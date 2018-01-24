import React from 'react';
import { Table } from 'antd';

function TableView(props) {
  console.warn(props);
  const columns = [
    {
      title: '关键字',
      dataIndex: 'keyword',
    },
    {
      title: '省份',
      dataIndex: 'province',
    },
    {
      title: '爬取状态',
      dataIndex: 'status',
    },
    {
      title: '爬取次数',
      dataIndex: 'crawlerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];

  return <Table style={{ marginTop: 10 }} columns={columns} dataSource={props.data} />;
}

export default TableView;
