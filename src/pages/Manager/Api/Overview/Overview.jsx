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
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>API Overview</Breadcrumb.Item>
    </Breadcrumb>
  );
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
    console.warn('new');
  }

  componentWillMount() {
    this.adminGetApiOverview({ page: 1 });
  }

  componentWillUpdate(nextProps) {
    const param = queryString.parse(nextProps.location.search);
    this.adminGetApiOverview({ page: 1, ...param });
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
          hideOnSinglePage={hideOnSinglePage}
          total={this.state.size}
          onChange={this.onPageChange}
        />
      </section>
    );
  }
}

export default Overview;
