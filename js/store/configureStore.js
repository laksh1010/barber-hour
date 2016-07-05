import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from '../reducers';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const createBarberHourStore = applyMiddleware(thunk, logger)(createStore);

function configureStore(onComplete) {
  const store = autoRehydrate()(createBarberHourStore)(reducers);
  persistStore(store, {storage: AsyncStorage, whitelist: ['user', 'address', 'services', 'scheduleTemplates', 'images']}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
