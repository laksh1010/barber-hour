import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import { connect } from 'react-redux';

import RouteMapper from './RouteMapper';
import Login from './auth/Login';
import BarberMain from './barber/Main';
import CustomerMain from './customer/Main';

class BarberHourApp extends Component {
  render() {
    let component = Login;
    if (this.props.isLoggedIn) {
      component = this.props.type === 'Barber' ? BarberMain : CustomerMain;
    } else {
      component = Login;
    }

    return (
      <Navigator
        initialRoute={{ component: component }}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn,
    type: store.user.type
  };
}

export default connect(select)(BarberHourApp);
