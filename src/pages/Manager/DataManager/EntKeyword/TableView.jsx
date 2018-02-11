import React from 'react';
import { Table, Tag } from 'antd';

function TableView(props) {
  const {
    data, onPageChange, handleDelete, handleUpdate, pageOption,
  } = props;
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
            result = <Tag color="magenta">未抓取</Tag>;
            break;
          case 1:
            result = <Tag color="orange">抓取失败</Tag>;
            break;
          case 2:
            result = <Tag color="blue">正在抓取</Tag>;
            break;
          case 3:
            result = <Tag color="green">抓取成功</Tag>;
            break;
          case 4:
          default:
            result = <Tag color="red">不存在</Tag>;
        }
        return result;
      },
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
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <button
            className="delete-data"
            onClick={() => {
              handleUpdate(record);
            }}
          >
            编辑
          </button>
          <button
            className="delete-data"
            onClick={() => {
              handleDelete(record.keyword);
            }}
          >
            删除
          </button>
        </span>
      ),
    },
  ];

  return (
    <Table style={{ marginTop: 10 }} columns={columns} dataSource={data} pagination={pagination} />
  );
}

export default TableView;
