import React from 'react';
import { Breadcrumb, message, Modal } from 'antd';
import queryString from 'query-string';
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

/**
 * pushHistory 动态设置URL参数
 *
 * @param {history} history
 * @param {string} key
 * @param {string|number} value
 */
function pushHistory(history, key, value) {
  const { location } = history;
  let param = location.search;

  if (!param) {
    param = `?${key}=${value}`;
  } else if (!new RegExp(`${key}=`, 'g').test(param)) {
    param += `&${key}=${value}`;
  } else {
    param = param.replace(new RegExp(`(${key}=)([^&])*(&)?`, 'g'), `$1${value}$3`);
  }

  const path = `${location.pathname}${param}`;
  history.push(path);
}

/**
 * 格式化URI查询参数
 *
 * @param {string|object} search
 * @returns
 */
function formatParam(search) {
  let searchObj;
  if (typeof search === 'string') {
    searchObj = queryString.parse(search);
  } else {
    searchObj = search;
  }

  const result = {};
  Object.keys(searchObj).forEach((key) => {
    if (searchObj[key]) {
      result[key] = searchObj[key];
    }
  });
  return result;
}

class EntKeyword extends React.Component {
  constructor(props) {
    super(props);

    // 初始化查询参数
    this.queryParam = formatParam(this.props.location.search);
    this.queryParam.page = (this.queryParam.page && +this.queryParam.page) || 1;

    this.state = {
      provinces: [],
      tableData: [],
      editData: {},
      pageOption: {
        total: 0,
        pageSize: 10,
        current: this.queryParam.page,
      },
      isAdding: false, // true show Modal and false hide modal.
      submitNewAdd: false, // true submit data to server
    };

    // 注册URL监听器
    this.props.history.listen((location, action) => {
      if (action === 'PUSH') {
        this.queryParam = queryString.parse(location.search);
        this.queryParam.page =
          (this.queryParam && this.queryParam.page && +this.queryParam.page) || 1; // 更新page
        this.search(this.queryParam);
      }
    });

    this.provinces = [];
    this.service = new Service();
    this.handleDownload = this.handleDownload.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleOkAdd = this.handleOkAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancelAdd = this.handleCancelAdd.bind(this);
    this.handleCompletedAdd = this.handleCompletedAdd.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.getProvince();
    this.search(this.queryParam);
  }

  onPageChange(page) {
    pushHistory(this.props.history, 'page', page);
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
          current: param.page,
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
    const pathString = queryString.stringify({ ...param, page: 1 });
    this.props.history.push(`${this.props.location.pathname}?${pathString}`);
  }

  handlePageChange(page) {
    pushHistory(this.props.history, 'page', page);
  }

  handleDelete(keyword) {
    Modal.confirm({
      title: '您确定要删除吗？',
      content: '此操作将彻底删除，并且不能恢复！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteUser(keyword);
      },
      onCancel: () => {
        message.success('已取消删除');
      },
    });
  }

  deleteUser(keyword) {
    this.service.deleteKeywordInfo(keyword).then((data) => {
      if (data.code === '2000') {
        message.success('delete keyword success！！！');
        this.search(this.queryParam);
      }
    });
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

  handleUpdate(data) {
    console.warn(data);
    this.setState({
      isAdding: true,
      editData: data,
    });
  }

  handleCompletedAdd() {
    this.setState({
      isAdding: false,
    });
    this.search(this.queryParam);
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
            data={this.state.editData}
            provinces={this.state.provinces}
            onSubmit={this.state.submitNewAdd}
            onCompleted={this.handleCompletedAdd}
          />
        </Modal>

        <section>
          <Search
            provinces={this.state.provinces}
            queryParam={this.queryParam}
            onSearch={this.handleSearch}
            onAddNew={this.handleAddNew}
            onDownload={this.handleDownload}
          />
          <TableView
            pageOption={this.state.pageOption}
            onPageChange={this.handlePageChange}
            handleUpdate={this.handleUpdate}
            handleDelete={this.handleDelete}
            data={this.state.tableData}
          />
        </section>
      </section>
    );
  }
}

export default EntKeyword;
