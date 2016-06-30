import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import { connect } from 'react-redux';

import RouteMapper from './RouteMapper';
import Login from './auth/Login';

class BarberHourApp extends Component {
  render() {
    console.log('render BarberHourApp', this.props);
    return (
      <Navigator
        initialRoute={{ component: Login }}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}

export default connect()(BarberHourApp);
