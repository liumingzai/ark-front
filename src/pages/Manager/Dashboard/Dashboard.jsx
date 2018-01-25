/* eslint-disable */
import React from 'react';
import { Row, Col, Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

import DashboardService from './DashBoardService';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiTotalNum: 0,
      apiIncrementTotalNum: 0,
      accountTotalNum: 0,
      accountIncrementTotalNum: 0,
      lastApiAccessTotalNum: 0,
      lastLoginTotalNum: 0,
      curApiAccessTotalNum: 0,
      curLoginTotalNum: 0,
      countLastApiAccess: [],
      countCurApiAccess: [],
      countLastLogin: [],
      countCurLogin: [],
      loginTop: [],
      accessApiTop: [],
      countWhiteListDenied: [],
      financeTotalNum: 0,
      orderTotalNum: 0,
    };

    this.dashboardService = new DashboardService();
  }

  componentDidMount() {
    this.getDashboardData();
  }

  getDashboardData() {
    this.dashboardService.getDatas().then(data => {
      if ('2000' === data.code) {
        // countLastApiAccess: data.data.countLastApiAccess, // ? JSON.parse(this.state.countLastApiAccess) : [],
        // countCurApiAccess: data.data.countCurApiAccess, // ? JSON.parse(this.state.countCurApiAccess) : [],
        // countLastLogin: data.data.countLastLogin, // ? JSON.parse(this.state.countLastLogin) : [],
        // countCurLogin: data.data.countCurLogin, // ? JSON.parse(this.state.countCurLogin) : [],
        // loginTop: data.data.loginTop, // ? JSON.parse(this.state.loginTop) : [],
        // accessApiTop: data.data.accountTotalNum, // ? JSON.parse(this.state.accountTotalNum) : [],
        // countWhiteListDenied: data.data.countWhiteListDenied, // ? JSON.parse(this.state.countWhiteListDenied) : [],
        this.setState({
          apiTotalNum: data.data.apiTotalNum,
          apiIncrementTotalNum: data.data.apiIncrementTotalNum,
          accountTotalNum: data.data.accountTotalNum,
          accountIncrementTotalNum: data.data.accountIncrementTotalNum,
          lastApiAccessTotalNum: data.data.lastApiAccessTotalNum,
          lastLoginTotalNum: data.data.lastLoginTotalNum,
          curApiAccessTotalNum: data.data.curApiAccessTotalNum,
          curLoginTotalNum: data.data.curLoginTotalNum,
          financeTotalNum: data.data.financeTotalNum,
          orderTotalNum: data.data.orderTotalNum,
        });
      }
    });
  }

  render() {
    const apiVisitOption = {
      title: {
        text: '上月，本月接口访问量对比',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['本月', '上月'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '本月',
          type: 'line',
          stack: '接口访问量',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '上月',
          type: 'line',
          stack: '接口访问量',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };

    const apiVisitTop = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    };

    const accountVisitTop = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    };

    const whiteListOption = {
      title: {
        text: '白名单拦截记录统计',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '白名单拦截',
          type: 'line',
          stack: '接口访问量',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
      ],
    };

    return (
      <div className="gutter-example">
        <Row gutter={16} justify="center" style={{ marginBottom: 16 }}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card>
                <p>
                  <span>用户数量:</span>
                  <span>{this.state.accountTotalNum}</span>
                </p>
                <p>
                  <span>本月新增:</span>
                  <span>{this.state.accountIncrementTotalNum}</span>
                </p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card>
                <p>
                  <span>接口数量:</span>
                  <span>{this.state.apiTotalNum}</span>
                </p>
                <p>
                  <span>本月新增:</span>
                  <span>{this.state.apiIncrementTotalNum}</span>
                </p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card>
                <p>
                  <span>上月接口总访问数:</span>
                  <span>{this.state.lastApiAccessTotalNum}</span>
                </p>
                <p>
                  <span>本月接口总访问数</span>
                  <span>{this.state.curApiAccessTotalNum}</span>
                </p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Card>
                <p>
                  <span>上月用户总登录数数</span>
                  <span>{this.state.lastLoginTotalNum}</span>
                </p>
                <p>
                  <span>本月用户总登录数数</span>
                  <span>{this.state.curLoginTotalNum}</span>
                </p>
              </Card>
            </div>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="接口访问趋势">
                <ReactEcharts
                  option={apiVisitOption}
                  style={{ height: '300px', width: '1200px' }}
                  className="react_for_echarts"
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card title="柱状图">
                <ReactEcharts
                  option={apiVisitTop}
                  style={{ height: '300px', width: '600px' }}
                  className="react_for_echarts"
                />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card title="柱状图">
                <ReactEcharts
                  option={accountVisitTop}
                  style={{ height: '300px', width: '600px' }}
                  className="react_for_echarts"
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="折线图">
                <ReactEcharts
                  option={whiteListOption}
                  style={{ height: '300px', width: '1200px' }}
                  className="react_for_echarts"
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="上月财务" style={{ textAlign: 'center' }}>
                <p>
                  <span>收入:</span>
                  <span>{this.state.financeTotalNum}</span>
                  {'   '}
                  <span>订单数量:</span>
                  <span>{this.state.orderTotalNum}</span>
                </p>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
