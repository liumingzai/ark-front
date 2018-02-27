import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Col, Button, message, Breadcrumb } from 'antd';
import CodeError from './CodeError';
import RequestBody from './RequestBody';
import OverviewDetailService from './OverviewDetailService';
import CommonForm from './CommonForm';
import Publish from './Publish';

const FormItem = Form.Item;
function BreadNav() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/manager/api/overview">数据接口</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>接口详情</Breadcrumb.Item>
    </Breadcrumb>
  );
}

/**
 * 接口详情
 *
 * 2种角色 管理员（有编辑权限） 注册用户（只有查看权限）
 *
 * @class OverviewDetail
 * @extends {React.Component}
 */
class OverviewDetail extends React.Component {
  constructor(props) {
    super(props);

    this.userType = JSON.parse(localStorage.getItem('account')).userType;
    this.apiId = this.props.match.params.id;
    this.state = {
      publish: true,
      paramList: [],
      errorCodeList: [],
      fields: {
        apiName: {
          value: '',
        },
        accessUrl: {
          value: null,
        },
        queryType: {
          value: null,
        },
        returnType: {
          value: null,
        },
        accessSample: {
          value: null,
        },
        returnSample: {
          value: null,
        },
      },
      doSubmit: false,
    };

    this.dataStorage = {};
    this.service = new OverviewDetailService();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSyncData = this.handleSyncData.bind(this);
  }

  componentDidMount() {
    this.getApiInfo(this.apiId);
  }

  /**
   * 根apiId 获取接口详情
   *
   * @param {any} apiId
   * @memberof OverviewDetail
   */
  getApiInfo(apiId) {
    this.service.getApiInfo(apiId).then((data) => {
      if (data.code === '2000') {
        const fields = {};

        if (data.data) {
          this.dataStorage = data.data; // 存储数据

          Object.keys(data.data).forEach((key) => {
            if (key !== 'paramList' && key !== 'errorCodeList' && key !== 'publish') {
              fields[key] = {
                value: data.data[key],
              };
            }
          });

          this.setState({
            fields,
            publish: data.data.publish === 1,
            errorCodeList: data.data.errorCodeList,
            paramList: data.data.paramList.map((e) => {
              e.queryOption = e.queryOption === 'Y';
              return e;
            }),
          });
        }
      }
    });
  }

  updateApiInfo(apiId, param) {
    this.service.updateApiInfo(apiId, param).then((data) => {
      if (data.code === '2000') {
        message.success('更新成功');
        this.props.history.push('/manager/api/overview');
      }
    });
  }

  handleSyncData(data) {
    Object.keys(data).forEach((key) => {
      this.dataStorage[key] = data[key];
    });
  }

  /**
   * 提交表单
   *
   * @memberof OverviewDetail
   */
  handleSubmit() {
    this.setState({
      doSubmit: true,
    });

    setTimeout(() => {
      const data = {};
      Object.keys(this.dataStorage.fields).forEach((key) => {
        data[key] = this.dataStorage.fields[key].value;
      });

      data.publish = this.dataStorage.publish;
      data.paramList = this.dataStorage.paramList;
      data.errorCodeList = this.dataStorage.errorCodeList;

      this.updateApiInfo(this.apiId, data); // 更新接口
    });
  }

  render() {
    return (
      <div>
        <BreadNav />
        <CommonForm
          userType={this.userType}
          fields={this.state.fields}
          doSubmit={this.state.doSubmit}
          syncData={this.handleSyncData}
        />

        <Col span={24}>
          <FormItem label="请求头部">
            <RequestBody
              userType={this.userType}
              data={this.state.paramList}
              doSubmit={this.state.doSubmit}
              syncData={this.handleSyncData}
            />
          </FormItem>
        </Col>

        <Col span={24}>
          <FormItem label="错误码">
            <CodeError
              userType={this.userType}
              data={this.state.errorCodeList}
              syncData={this.handleSyncData}
              doSubmit={this.state.doSubmit}
            />
          </FormItem>
        </Col>

        <Col span={24}>
          <Publish
            userType={this.userType}
            publish={this.state.publish}
            doSubmit={this.state.doSubmit}
            syncData={this.handleSyncData}
          />
        </Col>

        {this.userType === 1 ? (
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this.handleSubmit}>
              保存
            </Button>
          </Col>
        ) : null}
      </div>
    );
  }
}

export default OverviewDetail;
