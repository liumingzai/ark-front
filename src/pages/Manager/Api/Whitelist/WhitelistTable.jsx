import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'UID',
    dataIndex: 'uid',
    render: text => <a href="#a">{text}</a>,
  },
  {
    title: '用户ID',
    dataIndex: 'accountId',
  },
  {
    title: 'API ID',
    dataIndex: 'apiId',
  },
  {
    title: '资源名称',
    dataIndex: 'url',
  },
  {
    title: '客户端IP',
    dataIndex: 'clientIp',
  },
  {
    title: '通过标识',
    dataIndex: 'passFlag',
  },
  {
    title: '返回信息',
    dataIndex: 'rtnMessage',
  },
  {
    title: '访问日期',
    dataIndex: 'dailyDate',
  },
  {
    title: '访问数量',
    dataIndex: 'accessTotal',
  },
  {
    title: '访问主机名',
    dataIndex: 'domain',
  },
];

function WhitelistTable(props) {
  const { data } = props;
  let dataSource = [];
  if (data) {
    dataSource = data.map(e => ({
      key: e.id,
      uid: e.uid,
      accountId: e.accountId,
      apiId: e.apiId,
      url: e.url,
      clientIp: e.clientIp,
      passFlag: e.passFlag,
      rtnMessage: e.rtnMessage,
      dailyDate: e.dailyDate,
      accessTotal: e.accessTotal,
      domain: e.domain,
    }));
  }

  return <Table columns={columns} dataSource={dataSource} />;
}

export default WhitelistTable;
