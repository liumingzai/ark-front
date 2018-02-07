import React from 'react';
import { Breadcrumb, Modal } from 'antd';
import Service from './EntKeywordService';
import Search from './Search';
import TableView from './TableView';
import AddNew from './AddNew';

function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>数据管理</Breadcrumb.Item>
      <Breadcrumb.Item>企业关键字</Breadcrumb.Item>
    </Breadcrumb>
  );
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const Y = date.getFullYear();
  const m = date.getMonth() + 1;
  const M = m < 10 ? `0${m}` : m;
  const d = date.getDate();
  const D = d < 10 ? `0${d}` : d;

  return `${Y}-${M}-${D}`;
}

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
      submitNewAdd: false,
    };
    this.searchParam = {
      pageNum: 1,
    };
    this.provinces = [];
    this.service = new Service();
    this.handleDownload = this.handleDownload.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleOkAdd = this.handleOkAdd.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleCompletedAdd = this.handleCompletedAdd.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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
        const pageOption = {
          total: data.size,
          pageSize: this.state.pageOption.pageSize,
        };
        this.setState({
          tableData: data.data.map((e) => {
            e.key = e.id;
            e.createTime = formatDate(e.createTime);
            return e;
          }),
          pageOption,
        });
      }
    });
  }

  handleDownload() {
    this.service.getKeywordTemplate();
  }

  handleSearch(param) {
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

  handleCancelAdd() {
    this.setState({
      isAdding: false,
    });
  }

  handleCompletedAdd() {
    this.setState({
      isAdding: false,
    });
    this.search(this.searchParam);
  }

  handleOkAdd() {
    this.setState({
      submitNewAdd: true,
    });
  }

  render() {
    return (
      <section>
        <BreadNav />

        {/* 新增 */}
        <Modal
          title="新增企业关键字"
          visible={this.state.isAdding}
          onOk={this.handleOkAdd}
          onCancel={this.handleCancelAdd}
          cancelText="取消"
          okText="提交"
          destroyOnClose="true"
        >
          <AddNew
            provinces={this.state.provinces}
            onSubmit={this.state.submitNewAdd}
            onCompleted={this.handleCompletedAdd}
          />
        </Modal>

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
      </section>
    );
  }
}

export default EntKeyword;
