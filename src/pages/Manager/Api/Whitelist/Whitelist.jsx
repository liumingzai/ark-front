import React from 'react';
import { Breadcrumb } from 'antd';
import WhitelistSearch from './WhitelistSearch';
import WhitelistTable from './WhitelistTable';
import WhitelistService from './WhitelistService';

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const Y = date.getFullYear();
  const m = date.getMonth() + 1;
  const M = m < 10 ? `0${m}` : m;
  const d = date.getDate();
  const D = d < 10 ? `0${d}` : d;

  return `${Y}-${M}-${D}`;
}

function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>API管理</Breadcrumb.Item>
      <Breadcrumb.Item>白名单请求记录</Breadcrumb.Item>
    </Breadcrumb>
  );
}

class Whitelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pageConf: {
        total: 0,
        pageSize: 10,
      },
    };
    this.service = new WhitelistService();
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getSummaryWhiteListLog({ page: 1 });
  }

  onPageChange(currentPage) {
    this.getSummaryWhiteListLog({ page: currentPage });
  }

  onSearch(data) {
    const {
      uid: { value: uid },
      apiName: { value: apiName },
      clientIp: { value: clientIp },
      url: { value: url },
    } = data;

    let { dailyDate: { value: dailyDate } } = data;

    if (dailyDate) {
      dailyDate = formatDate(dailyDate);
    }

    this.getSummaryWhiteListLog({
      uid,
      apiName,
      dailyDate,
      clientIp,
      url,
      page: 1,
    });
  }

  getSummaryWhiteListLog(param) {
    this.service.getSummaryWhiteListLog(param).then((data) => {
      if (data.code === '2000') {
        const pageConf = {
          total: data.size,
          pageSize: this.state.pageConf.pageSize,
        };
        this.setState({
          data: data.data.map((e) => {
            e.dailyDate = formatDate(e.dailyDate);
            return e;
          }),
          pageConf,
        });
      }
    });
  }

  render() {
    return (
      <section>
        <BreadNav />
        <WhitelistSearch onSearch={this.onSearch} />
        <WhitelistTable
          data={this.state.data}
          pageConf={this.state.pageConf}
          onChange={this.onPageChange}
        />
      </section>
    );
  }
}

export default Whitelist;
