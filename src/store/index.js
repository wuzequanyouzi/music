// combineReducers 可以将多个reducer合并成最终的reducer
import { combineReducers } from 'redux';
import * as reducer from './reducer';

const store = combineReducers({
  ...reducer
});

export default store;