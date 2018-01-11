import React from 'react';
import { Col, Button, Card } from 'antd';
import defaultLogo from '../../../../assets/images/common/no-img-default.png';

function OverviewItem(props) {
  const { item } = props;
  return (
    <Col span={6} style={{ paddingLeft: '6px', paddingRight: '6px' }}>
      <Card cover={<img src={defaultLogo} alt="Logo" />}>
        <div className="card-body">
          <h4 className="card-title">{item.apiName}</h4>
          <h5>
            分类： <span className="text-gray">{item.apiCategory}</span>
          </h5>
          <h5>
            价格(分/次)： <strong className="text-red">{item.unitPrice}</strong>
          </h5>
          <h5>
            更新时间：<span>{item.updateTime}</span>
          </h5>
          <Button type="primary">编辑</Button>
          <Button type="danger">删除</Button>
        </div>
      </Card>
    </Col>
  );
}

export default OverviewItem;
