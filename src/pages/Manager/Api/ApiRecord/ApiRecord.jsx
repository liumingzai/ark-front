import React from 'react';
import ApiRecordSearch from './ApiRecordSearch';
import ApiRecordTable from './ApiRecordTable';
import ApiRecordService from './ApiRecordService';

function getUserType() {
  const account = JSON.parse(localStorage.getItem('account'));
  return account.userType;
}

class ApiRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pageConf: {
        total: 0,
        pageSize: 10,
      },
    };
    this.service = new ApiRecordService();
  }

  componentDidMount() {
    this.initData();
  }

  onPageChange(currentPage) {
    this.initData({ page: currentPage });
  }

  getCountAsscssApi(page = 1, id) {
    this.service.getCountAsscssApi(page, id).then((data) => {
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
        page: (param && param.page) || 1,
      });
    } else {
      this.getCountAsscssApi(param && param.page);
    }
  }

  render() {
    return (
      <section>
        <ApiRecordSearch />
        <ApiRecordTable
          data={this.state.data}
          pageConf={this.state.pageConf}
          onChange={this.onPageChange}
        />
      </section>
    );
  }
}

export default ApiRecord;
