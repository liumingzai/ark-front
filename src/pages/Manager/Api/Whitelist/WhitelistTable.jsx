import React from 'react';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: '用户ID',
    dataIndex: 'uid',
    // render: text => <a href="#a">{text}</a>,
  },
  {
    title: '接口名称',
    dataIndex: 'apiName',
  },
  {
    title: '访问地址',
    dataIndex: 'url',
  },
  {
    title: '客户端IP',
    dataIndex: 'clientIp',
  },
  {
    title: '通过标识',
    dataIndex: 'passFlag',
    render: text => (text === 1 ? <Tag color="green">通过</Tag> : <Tag color="red">拒绝</Tag>),
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
  const { data, pageConf, onChange } = props;
  const pagination = {
    current: pageConf.current,
    total: pageConf.total,
    pageSize: pageConf.pageSize,
    hideOnSinglePage: true,
    onChange,
  };

  let dataSource = [];
  if (data) {
    dataSource = data.map(e => ({
      key: e.id,
      uid: e.uid,
      url: e.url,
      apiName: e.apiName,
      clientIp: e.clientIp,
      passFlag: e.passFlag,
      rtnMessage: e.rtnMessage,
      dailyDate: e.dailyDate,
      accessTotal: e.accessTotal,
      domain: e.domain,
    }));
  }

  return (
    <Table
      style={{ marginTop: 10 }}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
    />
  );
}

export default WhitelistTable;
