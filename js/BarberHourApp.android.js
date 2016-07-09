import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import { connect } from 'react-redux';

import RouteMapper from './RouteMapper';
import Login from './auth/Login';
import BarberMain from './barber/Main';
import CustomerMain from './customer/Main';
import AccountTypeSelector from './auth/AccountTypeSelector';
import AddressForm from './barber/AddressForm';
import PhoneForm from './customer/PhoneForm';
import VerifyPhone from './customer/VerifyPhone';
import ServicesForm from './barber/ServicesForm';
import ImageChooser from './barber/ImageChooser';
import ScheduleBuilder from './barber/ScheduleBuilder'
import WaitReview from './barber/WaitReview';

class BarberHourApp extends Component {
  _openSignupStep() {
    switch (this.props.signupStep) {
      case 'AccountTypeSelector':
        return AccountTypeSelector;
      case 'AddressForm':
        return AddressForm;
      case 'PhoneForm':
        return PhoneForm;
      case 'VerifyPhone':
        return VerifyPhone;
      case 'ServicesForm':
        return ServicesForm;
      case 'ImageChooser':
        return ImageChooser;
      case 'ScheduleBuilder':
        return ScheduleBuilder;
      case 'WaitReview':
        return WaitReview;
    }
  }

  _openMain() {
    if (this.props.type === 'Barber') {
      return BarberMain;
    } else if (this.props.type === 'Customer') {
      return CustomerMain;
    }
  }

  render() {
    let component = Login;

    if (this.props.isLoggedIn) {
      if (this.props.signupStep) {
        component = this._openSignupStep();
      } else {
        component = this._openMain();
      }
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
    type: store.user.type,
    signupStep: store.user.signupStep
  };
}

export default connect(select)(BarberHourApp);
