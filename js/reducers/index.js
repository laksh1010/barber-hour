import { combineReducers } from 'redux';

export default combineReducers({
  user: require('./user'),
  login: require('./login')
});
