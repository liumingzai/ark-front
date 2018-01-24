import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.warn(`selected ${value}`);
}

function Search(props) {
  console.warn(props);
  return (
    <section>
      <Row>
        <Col span={6} style={{ marginRight: '10px' }}>
          <Input placeholder="关键字" />
        </Col>

        <Col span={6}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a province"
            optionFilterProp="children"
            onChange={handleChange}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {props.provinces
              ? props.provinces.map(e => (
                <Option key={e} value={e}>
                  {e}
                </Option>
                ))
              : null}
          </Select>
        </Col>
      </Row>

      <Row>
        <Col span={12} style={{ float: 'right', marginTop: '8px', textAlign: 'right' }}>
          <Button style={{ marginRight: '10px' }}>下载模板</Button>
          <Button type="primary" style={{ marginRight: '10px' }}>
            批量新增
          </Button>
          <Button type="primary" style={{ marginRight: '10px' }}>
            新增
          </Button>
          <Button type="primary">查询</Button>
        </Col>
      </Row>
    </section>
  );
}

export default Search;
