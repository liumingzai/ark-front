import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Card } from 'antd';
import defaultLogo from '../../../../assets/images/common/no-img-default.png';

class OverviewItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.item.apiId);
  }

  render() {
    const { item } = this.props;
    return (
      <Col span={6} style={{ paddingLeft: '6px', paddingRight: '6px', marginBottom: '10px' }}>
        <Card
          cover={
            <img src={item.apiPic ? item.apiPic : defaultLogo} style={{ height: 180 }} alt="Logo" />
          }
        >
          <div className="card-body">
            <h4 className="card-title">
              <Link to={`/manager/api/overview/detail/${item.apiId}`}>{item.apiName}</Link>
            </h4>
            <h5>
              分类： <span className="text-gray">{item.apiCategory}</span>
            </h5>
            <h5>
              价格(分/次)： <strong className="text-red">{item.unitPrice}</strong>
            </h5>
            <h5>
              更新时间：<span>{item.updateTime}</span>
            </h5>
            {this.props.userType === 1 ? (
              <section>
                <Button type="primary" size="small" style={{ marginRight: 4 }}>
                  <Link to={`/manager/api/overview/update/${item.apiId}`}>编辑</Link>
                </Button>
                <Button type="danger" size="small" onClick={this.handleDelete}>
                  删除
                </Button>
              </section>
            ) : null}
          </div>
        </Card>
      </Col>
    );
  }
}

export default OverviewItem;
