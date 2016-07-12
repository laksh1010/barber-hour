import React, { Component, PropTypes } from 'react';

import Button from '../common/Button';

export default class FacebookButton extends Component {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.object
  };

  _onPress() {
    this.context.login();
  }

  render() {
    return(
      <Button
        outline containerStyle={this.props.style}
        text={this.props.text}
        disabled={this.props.disabled}
        onPress={this._onPress.bind(this)} />
    );
  }
}
