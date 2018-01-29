import React from 'react';
import { message } from 'antd';
import Service from './EntKeywordService';
import Search from './Search';
import TableView from './TableView';
import AddNew from './AddNew';

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
      isAdding: false, // is add or search status.
    };
    this.searchParam = {
      pageNum: 1,
    };
    this.provinces = [];
    this.service = new Service();
    this.handleDownload = this.handleDownload.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
  }

  componentDidMount() {
    this.getProvince();
    this.search(this.searchParam);
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

  search(param) {
    this.service.getKeywordInfo(param).then((data) => {
      if (data.code === '2000') {
        message.success('Search success');
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
    this.service.getKeywordTemplate();
  }

  handleSearch(param) {
    console.warn(param);
    this.search({ ...this.searchParam, ...param });
  }

  handlePageChange(currentPage) {
    this.search({ pageNum: currentPage });
  }

  handleAddNew() {
    this.setState({
      isAdding: true,
    });
  }

  handleSubmitAdd(data) {
    this.addKeywordInfo(data);
  }

  handleCancelAdd() {
    console.warn('cancel');
    this.setState({
      isAdding: false,
    });
  }

  addKeywordInfo(param) {
    this.service.addKeywordInfo(param).then((data) => {
      if (data.code === '2000') {
        message.success('Add success');
        this.setState({
          isAdding: false,
        });
      }
    });
  }

  render() {
    return (
      <section>
        {this.state.isAdding ? (
          <AddNew
            provinces={this.state.provinces}
            onSubmit={this.handleSubmitAdd}
            onCancel={this.handleCancelAdd}
          />
        ) : (
          <section>
            <Search
              provinces={this.state.provinces}
              onSearch={this.handleSearch}
              onAddNew={this.handleAddNew}
              onDownload={this.handleDownload}
            />
            <TableView
              pageOption={this.state.pageOption}
              onPageChange={this.handlePageChange}
              data={this.state.tableData}
            />
          </section>
        )}
      </section>
    );
  }
}

export default EntKeyword;
