import React from 'react';
import WhitelistSearch from './WhitelistSearch';
import WhitelistTable from './WhitelistTable';
import WhitelistService from './WhitelistService';

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
  }

  componentDidMount() {
    this.getSummaryWhiteListLog({ page: 1 });
  }

  onPageChange(currentPage) {
    this.getSummaryWhiteListLog({ page: currentPage });
  }

  getSummaryWhiteListLog(param) {
    this.service.getSummaryWhiteListLog(param).then((data) => {
      if (data.code === '2000') {
        const pageConf = {
          total: data.size,
          pageSize: this.state.pageConf.pageSize,
        };
        this.setState({
          data: data.data,
          pageConf,
        });
      }
    });
  }

  render() {
    return (
      <section>
        <WhitelistSearch />
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
