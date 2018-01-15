import React from 'react';
import { Form, Row, Col, Switch, Input, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class SceneForm extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      data,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  handleChange(e) {
    console.warn(e);
    console.warn(e.target.value);
    console.warn(this);
  }

  handleSwitchChange(e) {
    console.warn(e);
    console.warn(this);
  }

  render() {
    const { data } = this.state;
    return (
      <Form style={{ background: '#fff', padding: '10px', marginTop: '10px' }}>
        <Row>
          <Col span={8} style={{ marginRight: '10px' }}>
            <FormItem label="场景名称">
              <Input
                placeholder="Scene name"
                value={this.state.data.applicationName}
                onChange={this.handleChange}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="更新时间">
              <Input placeholder="Update time" readOnly disabled value={data.updateTime} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ marginRight: '10px' }}>
            <FormItem label="场景ID">
              <Input placeholder="SceneId" readOnly disabled value={data.id} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="最大白名单限制">
              <Input placeholder="Max size" readOnly disabled value={data.wlMaxCount} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ marginRight: '10px' }}>
            <FormItem label="场景描述">
              <TextArea
                placeholder="Describe"
                value={data.description}
                onChange={this.handleChange}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="白名单">
              <TextArea
                placeholder="Whitelist"
                value={data.wlContent}
                onChange={this.handleChange}
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ marginRight: '10px' }}>
            有效标识:{' '}
            <Switch
              checkedChildren="有效"
              unCheckedChildren="无效"
              checked={data.active === 'Y'}
              onChange={this.handleSwitchChange}
            />
          </Col>
          <Col span={8}>
            <FormItem label="User token">
              <Input placeholder="User token" value={data.userToken} onChange={this.handleChange} />
            </FormItem>
          </Col>
        </Row>

        <Row style={{ marginTop: '16px' }}>
          <Col span={16} style={{ textAlign: 'center' }}>
            <Button style={{ marginRight: '10px' }} type="primary">
              Save
            </Button>
            <Button style={{ marginLeft: '10px' }} type="danger">
              Delete
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SceneForm;
