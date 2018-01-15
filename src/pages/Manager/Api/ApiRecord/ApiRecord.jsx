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
      size: 0,
    };
    this.service = new ApiRecordService();
    console.warn(this.state.data);
  }

  componentDidMount() {
    if (getUserType() === 1) {
      this.adminGetCountAsscssApi({
        page: 1,
      });
    } else {
      this.getCountAsscssApi();
    }
  }

  getCountAsscssApi(page = 1, id) {
    this.service.getCountAsscssApi(page, id).then((data) => {
      if (data.code === '2000') {
        this.setState({
          data: data.data,
          size: data.size,
        });
      }
    });
  }

  adminGetCountAsscssApi(param) {
    this.service.adminGetCountAsscssApi(param).then((data) => {
      if (data.code === '2000') {
        this.setState({
          data: data.data,
          size: data.size,
        });
      }
    });
  }

  render() {
    return (
      <section>
        <ApiRecordSearch />
        <h3>{this.state.size}</h3>
        <ApiRecordTable data={this.state.data} />
      </section>
    );
  }
}

export default ApiRecord;
