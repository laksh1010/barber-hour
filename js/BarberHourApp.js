import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import RouteMapper from './RouteMapper';
import Login from './auth/Login';

export default class BarberHourApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ component: Login }}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}
