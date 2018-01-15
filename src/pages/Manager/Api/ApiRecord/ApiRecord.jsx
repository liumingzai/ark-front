import React from 'react';
import ApiRecordSearch from './ApiRecordSearch';
import ApiRecordTable from './ApiRecordTable';

class ApiRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  render() {
    return (
      <section>
        <ApiRecordSearch />
        <h3>{this.state.data}</h3>
        <ApiRecordTable />
      </section>
    );
  }
}

export default ApiRecord;
