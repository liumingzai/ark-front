import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';

function Operation(props) {
  const isNewAdd = props.type && props.type.id;
  return (
    <Row style={{ marginTop: 10 }}>
      <Col span={16} style={{ textAlign: 'center' }}>
        <Button style={{ marginRight: '10px' }} onClick={props.onSubmit} type="primary">
          保存
        </Button>
        {isNewAdd ? (
          <Button onClick={props.onDelete} type="danger">
            删除
          </Button>
        ) : (
          <Button onClick={props.onCancel}>取消</Button>
        )}
      </Col>
    </Row>
  );
}

Operation.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Operation;
