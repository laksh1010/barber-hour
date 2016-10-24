import { combineReducers } from 'redux';

export default combineReducers({
  user: require('./user'),
  login: require('./login'),
  signup: require('./signup'),
  startPhoneVerification: require('./startPhoneVerification'),
  verifyPhone: require('./verifyPhone'),
  address: require('./address'),
  account: require('./account'),
  password: require('./password'),
  services: require('./services'),
  scheduleTemplates: require('./scheduleTemplates'),
  images: require('./images'),
  barbers: require('./barbers'),
  schedules: require('./schedules'),
  appointment: require('./appointment'),
  appointments: require('./appointments'),
  forgotPassword: require('./forgotPassword'),
  newPassword: require('./newPassword'),
  admin: require('./admin'),
  notification: require('./notification'),
  cities: require('./cities'),
  position: require('./position'),
  barbersChart: require('./barbersChart')
});
