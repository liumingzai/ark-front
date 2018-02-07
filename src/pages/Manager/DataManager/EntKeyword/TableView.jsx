import React from 'react';
import { Table, Tag } from 'antd';

function TableView(props) {
  const { data, onPageChange, pageOption } = props;
  const pagination = {
    current: pageOption.current,
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
      render: (text) => {
        let result;
        switch (text) {
          case 0:
            result = <Tag color="magenta">未找到</Tag>;
            break;
          case 1:
            result = <Tag color="orange">查找未找到</Tag>;
            break;
          case 2:
            result = <Tag color="blue">正在查找</Tag>;
            break;
          case 3:
          default:
            result = <Tag color="green">查找找到</Tag>;
        }
        return result;
      },
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
