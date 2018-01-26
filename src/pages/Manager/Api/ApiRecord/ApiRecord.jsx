import React from 'react';
import ApiRecordSearch from './ApiRecordSearch';
import ApiRecordTable from './ApiRecordTable';
import ApiRecordService from './ApiRecordService';

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const Y = date.getFullYear();
  const m = date.getMonth() + 1;
  const M = m < 10 ? `0${m}` : m;
  const d = date.getDate();
  const D = d < 10 ? `0${d}` : d;

  return `${Y}-${M}-${D}`;
}

function getUserType() {
  const account = JSON.parse(localStorage.getItem('account'));
  return account.userType;
}

class ApiRecord extends React.Component {
  constructor(props) {
    super(props);
    this.isAdmin = JSON.parse(localStorage.getItem('account')).userType === 1;
    this.userId = JSON.parse(localStorage.getItem('account')).uid;
    this.state = {
      data: null,
      pageConf: {
        total: 0,
        pageSize: 10,
      },
    };

    this.service = new ApiRecordService();
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.initData();
  }

  onPageChange(currentPage) {
    this.initData({ page: currentPage });
  }

  onSearch(data) {
    const { uid: { value: uid }, apiName: { value: apiName }, url: { value: url } } = data;
    let { startDate: { value: startDate }, endDate: { value: endDate } } = data;
    if (startDate) {
      startDate = formatDate(startDate);
    }
    if (endDate) {
      endDate = formatDate(endDate);
    }

    this.initData({
      uid,
      apiName,
      url,
      startDate,
      endDate,
      page: 1,
    });
  }

  getCountAsscssApi(param, id) {
    this.service.getCountAsscssApi(param, id).then((data) => {
      if (data.code === '2000') {
        const pageConf = {
          total: data.size,
          pageConf: this.state.pageConf.pageSize,
        };

        this.setState({
          data: data.data,
          pageConf,
        });
      }
    });
  }

  adminGetCountAsscssApi(param) {
    this.service.adminGetCountAsscssApi(param).then((data) => {
      if (data.code === '2000') {
        const pageConf = {
          total: data.size,
          pageConf: this.state.pageConf.pageSize,
        };

        this.setState({
          data: data.data,
          pageConf,
        });
      }
    });
  }

  initData(param) {
    if (getUserType() === 1) {
      this.adminGetCountAsscssApi({
        ...param,
        page: (param && param.page) || 1,
      });
    } else {
      this.getCountAsscssApi(
        {
          ...param,
          page: (param && param.page) || 1,
        },
        this.userId,
      );
    }
  }

  render() {
    return (
      <section>
        <ApiRecordSearch isAdmin={this.isAdmin} onSearch={this.onSearch} />
        <ApiRecordTable
          isAdmin={this.isAdmin}
          data={this.state.data}
          pageConf={this.state.pageConf}
          onChange={this.onPageChange}
        />
      </section>
    );
  }
}

export default ApiRecord;
