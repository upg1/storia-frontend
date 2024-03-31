import { combineReducers } from 'redux';
import graphReducer from './graphReducer';

const rootReducer = combineReducers({
  graph: graphReducer,
  // Add more reducers as your application grows
});

export default rootReducer;