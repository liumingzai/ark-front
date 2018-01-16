import React from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';

const FormItem = Form.Item;

function WhitelistSearch() {
  return (
    <Form>
      <Row>
        <Col span={8}>
          <FormItem label="UID">
            <Input placeholder="UID" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="API ID">
            <Input placeholder="API ID" />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem label="Access Date">
            <DatePicker />
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <FormItem label="Client IP">
            <Input placeholder="Client IP" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="API URL">
            <Input placeholder="API URL" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="Search">
            <Button>Search</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
}

export default WhitelistSearch;
