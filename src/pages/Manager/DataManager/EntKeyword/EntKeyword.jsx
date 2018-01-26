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
      pageOption: {
        total: 0,
        pageSize: 10,
      },
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
        const pageOption = {
          total: data.size,
          pageSize: this.state.pageOption.pageSize,
        };
        this.setState({
          tableData: data.data,
          pageOption,
        });
      }
    });
  }

  handleDownload() {
    this.getKeywordTemplate();
  }

  handlePageChange(currentPage) {
    this.search({ pageNum: currentPage });
  }

  render() {
    return (
      <section>
        <Search provinces={this.state.provinces} onDownload={this.handleDownload} />
        <TableView
          pageOption={this.state.pageOption}
          onPageChange={this.handlePageChange}
          data={this.state.tableData}
        />
      </section>
    );
  }
}

export default EntKeyword;
