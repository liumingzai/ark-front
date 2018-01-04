/*eslint-disable*/
import React from 'react';
import { Table, Spin, Divider  } from 'antd';

class UserList extends React.Component {
  columns() {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              {
                text: 'Green',
                value: 'Green',
              },
              {
                text: 'Black',
                value: 'Black',
              },
            ],
          },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
      },
      {
        title: 'Action',
        dataIndex: '',
        render: () => (
          <div>
            <a href="#">Edit</a>
            <Divider type="vertical" />
            <a href="#">Delete</a>
          </div>
        ),
      },
    ];
  }

  data() {
    return [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
    ];
  }
  // onChange(pagination, filters, sorter) {
  //   console.log('params', pagination, filters, sorter);
  // }

  render() {
    // const { houseCheckSearchResult, form } = this.props
    return (
      // <Spin tip="Loading...">
      <div>
        <h1>UserList</h1>
        <Table columns={this.columns()} dataSource={this.data()} />
      </div>
      // </Spin>
    );
  }
}

export default UserList;
