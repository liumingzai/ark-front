import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Button, Pagination, Breadcrumb, message, Modal } from 'antd';
import queryString from 'query-string';
import OverviewItem from './OverviewItem';
import SearchList from '../../../../components/SearchList';
import OverviewService from './OverviewService';

function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>数据接口</Breadcrumb.Item>
    </Breadcrumb>
  );
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
    param = param.replace(new RegExp(`(${key}=)(.)*&?`, 'g'), `$1${value}`);
  }

  const path = `${location.pathname}${param}`;
  history.push(path);
}

/**
 * format data 'yyyy-mm-dd'
 *
 * @param {any} timestamp
 * @returns
 */
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
 * Search Header filters
 *
 * @param {any} props
 * @returns
 */
function Header(props) {
  const searchList = [
    {
      label: '分类',
      key: 'cat',
      list: [
        {
          name: '全部',
          value: '',
        },
        {
          name: '企业',
          value: '企业',
        },
        {
          name: '专利',
          value: '专利',
        },
        {
          name: '工商',
          value: '工商',
        },
        {
          name: '其他',
          value: '其他',
        },
      ],
    },
  ];

  return (
    <header>
      <div>
        <SearchList match={props.match} data={searchList} />
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button type="primary">
          <Link to="/manager/api/overview/new">新增</Link>
        </Button>
      </div>
    </header>
  );
}

/**
 * 数据接口
 *
 * 两种用户：注册用户（只有查询功能，userType=3），管理员（新增，查询，编辑，删除 userType=1）
 * 通过userType区分不同角色
 * @class Overview
 * @extends {React.Component}
 */
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      size: 0,
    };

    // 初始化查询参数
    const { cat = '', page = 1 } = queryString.parse(this.props.location.search);
    this.queryParam = { cat, page: +page };

    // 注册URL监听器
    this.props.history.listen((location, action) => {
      if (action === 'PUSH') {
        const param = queryString.parse(location.search);
        this.queryParam.page = (param && param.page && +param.page) || 1; // 更新page
        this.getApiOverview(param);
      }
    });

    // 获取用户类型
    this.userType = JSON.parse(localStorage.getItem('account')).userType; // 1-admin 3-注册用户

    // 初始化service 及 其他绑定
    this.service = new OverviewService();
    this.getApiOverview = this.getApiOverview.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getApiOverview(this.queryParam);
  }

  onPageChange(page) {
    pushHistory(this.props.history, 'page', page);
  }

  /**
   * 根据用户角色，获取接口数据
   *
   * @param {{page,cat}} param
   * @memberof Overview
   */
  getApiOverview(param) {
    let service;
    if (this.userType === 1) {
      service = this.service.adminGetApiOverview(param);
    } else {
      service = this.service.getApiOverview(param);
    }
    service.then((data) => {
      if (data.code === '2000') {
        if (data.data) {
          data.data = data.data.map((e) => {
            e.updateTime = formatDate(e.updateTime);
            return e;
          });
        }

        this.setState({
          data: data.data || [],
          size: data.size,
        });
      }
    });
  }

  handleDelete(apiId) {
    Modal.confirm({
      title: '您确定要删除吗？',
      content: '此操作将彻底删除，并且不能恢复！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteApi(apiId);
      },
      onCancel: () => {
        message.success('Cancel delete');
      },
    });
  }

  deleteApi(apiId) {
    this.service.deleteApi(apiId).then((data) => {
      if (data.code === '2000') {
        message.success('Delete success');
        this.getApiOverview({ page: 1 });
      }
    });
  }

  render() {
    const hideOnSinglePage = true;
    return (
      <section>
        <BreadNav />
        <Header match={this.props.match} />
        <Row style={{ display: 'flex', flexFlow: 'wrap', marginTop: '10px' }}>
          {this.state.data.length > 0 &&
            this.state.data.map(e => (
              <OverviewItem
                userType={this.userType}
                key={e.apiId}
                item={e}
                onDelete={this.handleDelete}
              />
            ))}
        </Row>
        <Pagination
          current={this.queryParam.page}
          defaultPageSize={12}
          hideOnSinglePage={hideOnSinglePage}
          total={this.state.size}
          onChange={this.onPageChange}
        />
      </section>
    );
  }
}

export default withRouter(Overview);
