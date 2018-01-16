import React from 'react';
import WhitelistSearch from './WhitelistSearch';
import WhitelistTable from './WhitelistTable';
import WhitelistService from './WhitelistService';

class Whitelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.service = new WhitelistService();
  }

  componentDidMount() {
    this.getSummaryWhiteListLog({ pageNum: 1 });
  }

  getSummaryWhiteListLog(param) {
    this.service.getSummaryWhiteListLog(param).then((data) => {
      if (data.code === '2000') {
        this.setState({
          data: data.data,
        });
      }
    });
  }

  render() {
    return (
      <section>
        <WhitelistSearch />
        <WhitelistTable data={this.state.data} />
      </section>
    );
  }
}

export default Whitelist;
