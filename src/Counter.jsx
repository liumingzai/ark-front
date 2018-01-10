import { connect } from 'react-redux';
import increaseAction from './actions/counter';
import Counter from './components/Counter/Counter';

// Map Redux state to component props 数据绑定
function mapStateToProps({ counter }) {
  console.warn(counter);
  return {
    value: counter.count,
  };
}

// Map Redux actions to component props 事件绑定
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction),
  };
}

const CounterApp = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default CounterApp;
