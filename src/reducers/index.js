import { combineReducers } from 'redux';
import counter from './counter';

// Many reducers 合并成为一个
const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
