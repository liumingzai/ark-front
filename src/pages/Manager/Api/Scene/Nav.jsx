import React from 'react';
import PropTypes from 'prop-types';
import { Button, Radio } from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

function Nav(props) {
  return (
    <div className="flex flex-h-between">
      <RadioGroup onChange={props.onNavChange} defaultValue={0}>
        {props.data.map((item, index) => (
          <RadioButton key={item.id} value={index}>
            {item.applicationName}
          </RadioButton>
        ))}
      </RadioGroup>
      <Button type="primary" onClick={props.onAddNewScene}>
        新增场景
      </Button>
    </div>
  );
}

Nav.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      applicationName: PropTypes.string,
    }),
  ).isRequired,
  onNavChange: PropTypes.func.isRequired,
  onAddNewScene: PropTypes.func.isRequired,
};

export default Nav;
