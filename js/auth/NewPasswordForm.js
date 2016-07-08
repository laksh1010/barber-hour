import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput
} from 'react-native';

import { connect } from 'react-redux';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import Login from './Login';

import { newPassword } from '../actions/resetPassword';

class NewPasswordForm extends Component {
  _newPassword() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(newPassword(value, this.props.token));
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.resetTo({
        component: Login
      });
    }
  }

  getFormValue() {
    return {
      password: this.props.form.password,
      password_confirmation: this.props.form.password_confirmation
    };
  }

  render() {
    const NewPassword = t.struct({
      password: t.String,
      password_confirmation: t.String
    });

    const buttonLabel = this.props.form.isLoading ? 'Alterando...' : 'Alterar';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Nova senha</Text>
          <Form ref='form' type={NewPassword} options={this.props.form} value={this.getFormValue()} />
          <Button
            containerStyle={styles.button}
            text={buttonLabel}
            onPress={this._newPassword.bind(this)}
            disabled={this.props.form.isLoading} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.newPassword
  };
}

export default connect(select)(NewPasswordForm);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
});
