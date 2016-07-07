import React, { Component } from 'react';
import {
  NavigatorIOS
} from 'react-native';

import { connect } from 'react-redux';

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
      <NavigatorIOS
        initialRoute={{ component: component }}
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
