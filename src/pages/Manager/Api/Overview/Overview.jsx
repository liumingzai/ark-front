import React from 'react';
import { Row, Button, Pagination, Breadcrumb, message, Modal } from 'antd';
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
        <Button type="primary" onClick={props.onAddNew}>
          Add new
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
  }

  componentWillMount() {
    this.adminGetApiOverview({ page: 1 });
  }

  onPageChange(page) {
    this.adminGetApiOverview({ page });
  }

  handleAddNew() {
    console.warn(this);
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
          data: data.data,
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
    return (
      <section>
        <BreadNav />
        <Header onAddNew={this.handleAddNew} match={this.props.match} />
        <Row style={{ display: 'flex', flexFlow: 'wrap', marginTop: '10px' }}>
          {this.state.data.length > 0 &&
            this.state.data.map(e => (
              <OverviewItem key={e.apiId} item={e} onDelete={this.handleDelete} />
            ))}
        </Row>
        <Pagination defaultCurrent={1} total={this.state.size} onChange={this.onPageChange} />
      </section>
    );
  }
}

export default Overview;
