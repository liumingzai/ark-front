/* eslint-disable */
import React from 'react';
import { Row, Col, Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import DashboardService from './DashBoardService';
import _ from 'lodash';

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
      countLastApiAccessDatas: [],
      countCurApiAccessCategory: [],
      countCurApiAccessDatas: [],
      countLastLoginDatas: [],
      countCurLoginCategory: [],
      countCurLoginDatas: [],
      loginTopCategory: [],
      loginTopDatas: [],
      accessApiTopCategory: [],
      accessApiTopDatas: [],
      countWhiteListDeniedCategory: [],
      countWhiteListDeniedDatas: [],
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

        // 上月，本月接口访问量对比数据解析
        if (data.data.countCurApiAccess) {
          let tempCurDatas = [];
          let tempLastDatas = [];
          let tempCategory = [];
          data.data.countCurApiAccess = JSON.parse(data.data.countCurApiAccess);
          data.data.countCurApiAccess.map(function(item) {
            tempCurDatas.push(item.sumNumber);
            tempCategory.push(item.dailyDate);
          });
          data.data.countLastApiAccess = JSON.parse(data.data.countLastApiAccess);
          data.data.countLastApiAccess.map(function(item) {
            tempLastDatas.push(item.sumNumber);
          });
          this.setState({
            countLastApiAccessDatas: tempLastDatas,
            countCurApiAccessCategory: tempCategory,
            countCurApiAccessDatas: tempCurDatas,
          });
        }

        // 上月，本月接口访问量对比数据解析
        if (data.data.countCurLogin) {
          let tempCurDatas = [];
          let tempLastDatas = [];
          let tempCategory = [];
          data.data.countCurLogin = JSON.parse(data.data.countCurLogin);
          data.data.countCurLogin.map(function(item) {
            tempCurDatas.push(item.sumNumber);
            tempCategory.push(item.dailyDate);
          });
          data.data.countLastLogin = JSON.parse(data.data.countLastLogin);
          data.data.countLastLogin.map(function(item) {
            tempLastDatas.push(item.sumNumber);
          });
          this.setState({
            countLastLoginDatas: tempLastDatas,
            countCurLoginCategory: tempCategory,
            countCurLoginDatas: tempCurDatas,
          });
        }

        // 登录次数Top5数据解析
        if (data.data.loginTop) {
          let tempDatas = [];
          let tempCategory = [];
          data.data.loginTop = JSON.parse(data.data.loginTop);
          data.data.loginTop.map(function(item) {
            tempDatas.push(item.sumLoginNum);
            tempCategory.push(item.username);
          });
          this.setState({
            loginTopCategory: tempCategory || [],
            loginTopDatas: tempDatas || [],
          });
        }

        // 接口访问次数Top5数据解析
        if (data.data.accessApiTop) {
          let tempDatas = [];
          let tempCategory = [];
          data.data.accessApiTop = JSON.parse(data.data.accessApiTop);
          data.data.accessApiTop.map(function(item) {
            tempDatas.push(item.sumAccessNum);
            tempCategory.push(item.apiName);
          });
          this.setState({
            accessApiTopCategory: tempCategory || [],
            accessApiTopDatas: tempDatas || [],
          });
        }

        // 白名单拦截记录统计数据解析
        if (data.data.countWhitelistDenied) {
          let tempDatas = [];
          let tempCategory = [];
          data.data.countWhitelistDenied = JSON.parse(data.data.countWhitelistDenied);
          data.data.countWhitelistDenied.map(function(item) {
            tempCategory.push(item.dailyDate);
            tempDatas.push(item.sumNumber);
          });
          this.setState({
            countWhiteListDeniedCategory: tempCategory || [],
            countWhiteListDeniedDatas: tempDatas || [],
          });
        }
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
        data: this.state.countCurApiAccessCategory,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '本月',
          type: 'line',
          stack: '接口访问量',
          data: this.state.countCurApiAccessDatas,
        },
        {
          name: '上月',
          type: 'line',
          stack: '接口访问量',
          data: this.state.countLastApiAccessDatas,
        },
      ],
    };

    const accountVisitOption = {
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
        data: this.state.countCurLoginCategory,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '本月',
          type: 'line',
          stack: '接口访问量',
          data: this.state.countCurLoginDatas,
        },
        {
          name: '上月',
          type: 'line',
          stack: '接口访问量',
          data: this.state.countLastLoginDatas,
        },
      ],
    };

    const apiVisitTop = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: 'category',
        data: this.state.accessApiTopCategory,
        axisLabel: {
          rotate: 30,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '访问次数',
          type: 'bar',
          barWidth: '40%',
          data: this.state.accessApiTopDatas,
        },
      ],
    };

    const accountVisitTop = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: 'category',
        data: this.state.loginTopCategory,
        axisLabel: {
          rotate: 30,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '登录次数',
          type: 'bar',
          barWidth: '40%',
          data: this.state.loginTopDatas,
        },
      ],
    };

    const whiteListOption = {
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
        data: this.state.countWhiteListDeniedCategory,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '白名单拦截',
          type: 'line',
          stack: '接口访问量',
          data: this.state.countWhiteListDeniedDatas,
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
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="用户登录趋势">
                <ReactEcharts
                  option={accountVisitOption}
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
              <Card title="访问接口次数top5">
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
              <Card title="登录次数用户top5">
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
              <Card title="白名单拦截记录统计">
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
