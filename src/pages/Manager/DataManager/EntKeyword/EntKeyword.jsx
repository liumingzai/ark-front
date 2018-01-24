import React from 'react';
import Service from './EntKeywordService';
import Search from './Search';
import TableView from './TableView';

class EntKeyword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: [],
    };
    this.provinces = [];
    this.service = new Service();
  }

  componentDidMount() {
    this.getProvince();
  }

  getProvince() {
    this.service.getProvinces().then((data) => {
      if (data.code === '2000') {
        this.setState({
          provinces: data.data,
        });
      }
    });
  }

  render() {
    return (
      <section>
        <Search provinces={this.state.provinces} />
        <TableView />
      </section>
    );
  }
}

export default EntKeyword;
