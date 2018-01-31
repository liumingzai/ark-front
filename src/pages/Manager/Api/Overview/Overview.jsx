import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Button, Pagination, Breadcrumb, message, Modal } from 'antd';
import queryString from 'query-string';
import OverviewItem from './OverviewItem';
import SearchList from '../../../../components/SearchList';
import OverviewService from './OverviewService';

function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>API管理</Breadcrumb.Item>
      <Breadcrumb.Item>接口管理</Breadcrumb.Item>
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
          <Link to="/manager/api/overview/new">Add new</Link>
        </Button>
      </div>
    </header>
  );
}

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      size: 0,
    };
    this.service = new OverviewService();
    this.adminGetApiOverview = this.adminGetApiOverview.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.adminGetApiOverview({ page: 1 });
  }

  componentWillUpdate(nextProps) {
    const preParam = queryString.parse(this.props.location.search);
    const currParam = queryString.parse(nextProps.location.search);

    if (preParam.cat !== currParam.cat) {
      this.adminGetApiOverview({ page: 1, ...currParam });
    }
  }

  onPageChange(page) {
    this.adminGetApiOverview({ page });
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

  adminGetApiOverview(param) {
    this.service.adminGetApiOverview(param).then((data) => {
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

  deleteApi(apiId) {
    this.service.deleteApi(apiId).then((data) => {
      if (data.code === '2000') {
        message.success('Delete success');
        this.adminGetApiOverview({ page: 1 });
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
              <OverviewItem key={e.apiId} item={e} onDelete={this.handleDelete} />
            ))}
        </Row>
        <Pagination
          defaultCurrent={1}
          pageSizeOptions={12}
          hideOnSinglePage={hideOnSinglePage}
          total={this.state.size}
          onChange={this.onPageChange}
        />
      </section>
    );
  }
}

export default Overview;
