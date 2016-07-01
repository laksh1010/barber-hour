import { combineReducers } from 'redux';

export default combineReducers({
  user: require('./user'),
  login: require('./login'),
  signup: require('./signup'),
  startPhoneVerification: require('./startPhoneVerification'),
  verifyPhone: require('./verifyPhone'),
  address: require('./address'),
  account: require('./account')
});
