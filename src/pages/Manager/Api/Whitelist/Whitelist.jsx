import React from 'react';
import { Breadcrumb } from 'antd';
import queryString from 'query-string';

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
      <Breadcrumb.Item>接口统计</Breadcrumb.Item>
      <Breadcrumb.Item>白名单访问记录</Breadcrumb.Item>
    </Breadcrumb>
  );
}

/**
 * pushHistory 动态设置URL参数
 *
 * @param {history} history
 * @param {string} key
 * @param {string|number} value
 */
function pushHistory(history, key, value) {
  const { location } = history;
  let param = location.search;

  if (!param) {
    param = `?${key}=${value}`;
  } else if (!new RegExp(`${key}=`, 'g').test(param)) {
    param += `&${key}=${value}`;
  } else {
    param = param.replace(new RegExp(`(${key}=)([^&])*(&)?`, 'g'), `$1${value}$3`);
  }

  const path = `${location.pathname}${param}`;
  history.push(path);
}

/**
 * 格式化URI查询参数
 *
 * @param {string|object} search
 * @returns
 */
function formatParam(search) {
  let searchObj;
  if (typeof search === 'string') {
    searchObj = queryString.parse(search);
  } else {
    searchObj = search;
  }

  const result = {};
  Object.keys(searchObj).forEach((key) => {
    if (searchObj[key]) {
      result[key] = searchObj[key];
    }
  });
  return result;
}

/**
 * Admin用户白名单访问记录
 *
 * @class Whitelist
 * @extends {React.Component}
 */
class Whitelist extends React.Component {
  constructor(props) {
    super(props);

    // 初始化查询参数
    this.queryParam = formatParam(this.props.location.search);
    this.queryParam.page = (this.queryParam.page && +this.queryParam.page) || 1;

    this.state = {
      data: null,
      pageConf: {
        total: 0,
        pageSize: 10,
        current: this.queryParam.page,
      },
    };

    // 注册URL监听器
    this.props.history.listen((location, action) => {
      if (action === 'PUSH') {
        this.queryParam = queryString.parse(location.search);
        this.queryParam.page =
          (this.queryParam && this.queryParam.page && +this.queryParam.page) || 1; // 更新page
        this.getSummaryWhiteListLog(this.queryParam);
      }
    });

    this.service = new WhitelistService();
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getSummaryWhiteListLog(this.queryParam);
  }

  onPageChange(page) {
    pushHistory(this.props.history, 'page', page);
  }

  /**
   * 输入查询参数之后，手动搜索
   *
   * @param {any} data
   * @memberof Whitelist
   */
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

    const path = formatParam({
      uid,
      apiName,
      dailyDate,
      clientIp,
      url,
      page: 1,
    });
    const pathString = queryString.stringify(path);
    this.props.history.push(`${this.props.location.pathname}?${pathString}`);
  }

  /**
   * 获取白名单访问统计记录
   *
   * @param {any} param
   * @memberof Whitelist
   */
  getSummaryWhiteListLog(param) {
    this.service.getSummaryWhiteListLog(param).then((data) => {
      if (data.code === '2000') {
        const pageConf = {
          total: data.size,
          pageSize: this.state.pageConf.pageSize,
          current: param.page,
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
        <WhitelistSearch queryParam={this.queryParam} onSearch={this.onSearch} />
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
