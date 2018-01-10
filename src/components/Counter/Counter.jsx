import React from 'react';
import PropTypes from 'prop-types';

function Counter(props) {
  const { value, onIncreaseClick } = props;
  return (
    <div>
      <span>{value}</span>
      <button onClick={onIncreaseClick}>Incresease</button>
    </div>
  );
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired,
};

export default Counter;
