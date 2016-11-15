import React, { Component } from 'react';
import { Client, Configuration } from 'bugsnag-react-native';
import { connect } from 'react-redux';

import { bugsnagKey } from './env';

class Bugsnag extends Component {
  constructor(props) {
    super(props);
    const configuration = new Configuration(bugsnagKey);
    configuration.notifyReleaseStages = ['production'];
    this.client = new Client(configuration);
  }

  componentDidMount() {
    var { user } = this.props;

    if (user.isLoggedIn) {
      this.client.setUser(user.token, user.name, user.email);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.isLoggedIn && this.props.user.isLoggedIn) {
      var { user } = this.props;
      this.client.setUser(user.token, user.name, user.email);
    } else if (prevProps.user.isLoggedIn && !this.props.user.isLoggedIn) {
      this.client.setUser('', '', '');
    }
  }

  render() {
    return this.props.children;
  }
}

function select(store) {
  return {
    user: store.user
  };
}

export default connect(select)(Bugsnag);
