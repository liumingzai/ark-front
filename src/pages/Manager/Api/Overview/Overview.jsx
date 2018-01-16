import React from 'react';
import { Row, Button, Pagination, Breadcrumb } from 'antd';
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
      <div>
        <Button type="primary">New</Button>
        <Button type="primary">Update</Button>
      </div>
    </header>
  );
}

/**
 * Get all items
 *
 * @param {any} data
 * @returns
 */
function itemList(data) {
  return data.map(e => <OverviewItem key={e.apiId} item={e} />);
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

  render() {
    return (
      <section>
        <BreadNav />
        <Header match={this.props.match} />
        <Row>{this.state.data.length > 0 && itemList(this.state.data)}</Row>
        <Pagination defaultCurrent={1} total={this.state.size} onChange={this.onPageChange} />
      </section>
    );
  }
}

export default Overview;
