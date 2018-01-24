import React from 'react';
import { message } from 'antd';
import Service from './EntKeywordService';
import Search from './Search';
import TableView from './TableView';

class EntKeyword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: [],
      tableData: [],
    };
    this.provinces = [];
    this.service = new Service();
    this.handleDownload = this.handleDownload.bind(this);
  }

  componentDidMount() {
    this.getProvince();
    this.search();
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

  getKeywordTemplate() {
    this.service.getKeywordTemplate().then((data) => {
      if (data.code === '2000') {
        message.success('Downloading ... ');
      }
    });
  }

  search(pageNum = 1) {
    this.service.getKeywordInfo({ pageNum }).then((data) => {
      if (data.code === '2000') {
        this.setState({
          tableData: data.data,
        });
      }
    });
  }

  handleDownload() {
    this.getKeywordTemplate();
  }

  render() {
    return (
      <section>
        <Search provinces={this.state.provinces} onDownload={this.handleDownload} />
        <TableView data={this.state.tableData} />
      </section>
    );
  }
}

export default EntKeyword;
