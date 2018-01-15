import React from 'react';
import WhitelistSearch from './WhitelistSearch';
import WhitelistTable from './WhitelistTable';

class Whitelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <section>
        <WhitelistSearch />
        <h3>content {this.state.data}</h3>
        <WhitelistTable />
      </section>
    );
  }
}

export default Whitelist;
