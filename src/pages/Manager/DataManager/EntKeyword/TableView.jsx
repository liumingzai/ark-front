import React from 'react';
import { Table } from 'antd';

function TableView(props) {
  const { data, onPageChange, pageOption } = props;
  const pagination = {
    defaultCurrent: 1,
    total: pageOption.total,
    pageSize: pageOption.pageSize,
    hideOnSinglePage: true,
    onChange: onPageChange,
  };

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
    {
      title: '优先级',
      dataIndex: 'priority',
      render: text => (text === 1 ? '高' : '低'),
    },
  ];

  return (
    <Table style={{ marginTop: 10 }} columns={columns} dataSource={data} pagination={pagination} />
  );
}

export default TableView;
