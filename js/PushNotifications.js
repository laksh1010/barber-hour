import React, { Component, Platform } from 'react';

import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';

import Pubnub from './Pubnub';
import { gcmSenderID } from './env';
import { addChannel, removeChannel } from './actions/notification';

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
      Pubnub.enablePushNotificationsOnChannel('admin', registration.token);
      this.props.dispatch(addChannel('admin'));
    }

    const channel = `${type}_${token}`;
    Pubnub.enablePushNotificationsOnChannel(channel, registration.token);
    this.props.dispatch(addChannel(channel));
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
    if (notification.data) {
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
