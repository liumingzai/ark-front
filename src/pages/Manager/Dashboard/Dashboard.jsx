/* eslint-disable */
import React from 'react';
import { Row, Col, Card } from 'antd';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="gutter-example">
        <Row gutter={16} justify="center" style={{ marginBottom: 16 }}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card>
                <p>
                  <span>注册用户：</span>
                  <span>38</span>
                </p>
                <p>
                  <span>注册用户：</span>
                  <span>38</span>
                </p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card>
                <p>
                  <span>注册用户：</span>
                  <span>38</span>
                </p>
                <p>
                  <span>注册用户：</span>
                  <span>38</span>
                </p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card>
                <p>
                  <span>注册用户：</span>
                  <span>38</span>
                </p>
                <p>
                  <span>注册用户：</span>
                  <span>38</span>
                </p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card>
                <p>
                  <span>注册用户：</span>
                  <span>38</span>
                </p>
                <p>
                  <span>注册用户：</span>
                  <span>38</span>
                </p>
              </Card>
            </div>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="折线图">
                <p>暂无数据</p>
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card title="柱状图">
                <p>暂无数据</p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card title="柱状图">
                <p>暂无数据</p>
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="折线图">
                <p>暂无数据</p>
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="散点图">
                <p>暂无数据</p>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
