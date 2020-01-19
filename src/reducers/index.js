import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import newsReducer from './news';

const  rootReducer = combineReducers({
  router: routerReducer,
  news: newsReducer
});

export default rootReducer;