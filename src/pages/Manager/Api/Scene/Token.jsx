import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Input } from 'antd';

function Token(props) {
  return (
    <Row>
      <Col span={8} style={{ marginRight: '10px' }}>
        <Input readOnly disabled value={props.token} />
      </Col>
      <Col span={8}>
        <Button onClick={props.onClick} type="primary">
          生成令牌
        </Button>
      </Col>
    </Row>
  );
}

Token.propTypes = {
  token: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Token.defaultProps = {
  token: '',
};

export default Token;
