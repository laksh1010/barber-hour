import React, { Component } from 'react';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';

import Pubnub from './Pubnub';
import { gcmSenderID } from './env';
import { addChannel, removeChannel } from './actions/notification';
import HaircutDetails from './customer/HaircutDetails';
import ReviewBarber from './admin/ReviewBarber';

class PushNotifications extends Component {
  componentDidMount() {
    PushNotification.configure({
      onRegister: this._onRegister.bind(this),
      onNotification: this._onNotification.bind(this),
      senderID: gcmSenderID
    });

    PushNotification.setApplicationIconBadgeNumber(0);
  }

  _onRegister(registration) {
    var {isLoggedIn} = this.props;

    if (isLoggedIn) {
      this._enablePush(registration);
    } else {
      this._disablePush(registration);
    }
  }

  _enablePush(registration) {
    var {isAdmin, token, type} = this.props;

    if (isAdmin) {
      this._addChannel('admin', registration.token);
    }

    this._addChannel(`${type}_${token}`, registration.token);
  }

  _addChannel(channel, token) {
    var {channels} = this.props;

    if (!channels.includes(channel)) {
      Pubnub.enablePushNotificationsOnChannel(channel, token);
      this.props.dispatch(addChannel(channel));
    }
  }

  _disablePush(registration) {
    var {channels} = this.props;

    if (channels.length) {
      channels.map(channel => {
        Pubnub.disablePushNotificationsOnChannel(channel, registration.token);
        this.props.dispatch(removeChannel(channel));
      });
    }
  }

  _onNotification(notification) {
    if (Platform.OS === 'android' && notification.foreground) {
      this._showNotification(notification);
    } else {
      this._openNotification(notification);
    }
  }

  _showNotification(notification) {
    PushNotification.localNotification(notification);
  }

  _openNotification(notification) {
    PushNotification.setApplicationIconBadgeNumber(0);

    if (notification.userInteraction && notification.data && this.props.navigator) {
      const data = Platform.OS === 'ios' ? notification.data.data : notification.data;
      this._goToComponent(data);
    }
  }

  _goToComponent(data) {
    switch (data.type) {
      case 'appointment_canceled':
      case 'remember_appointment':
        return this._openHaircutDetails(data.appointment_id);
      case 'new_barber_registered':
        return this._openReviewBarber(data.barber_id);
    }
  }

  _openHaircutDetails(appointmentId) {
    this.props.navigator.push({
      component: HaircutDetails,
      passProps: {appointmentId: appointmentId}
    });
  }

  _openReviewBarber(barberID) {
    this.props.navigator.push({
      component: ReviewBarber,
      passProps: {barberID: barberID}
    });
  }

  render() {
    return null;
  }
}

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn,
    isAdmin: store.user.admin,
    token: store.user.token,
    type: store.user.type,
    channels: store.notification.channels
  };
}

export default connect(select)(PushNotifications);
