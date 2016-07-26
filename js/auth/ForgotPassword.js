import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import ResetPasswordSent from './ResetPasswordSent';
import Email from '../forms/Email';

import { sendResetPassword } from '../actions/resetPassword';

class ForgotPassword extends Component {
  _sendResetPassword() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(sendResetPassword(value));
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.replace({
        component: ResetPasswordSent,
        title: 'Redefinir senha'
      });
    }
  }

  getFormValue() {
    return {
      email: this.props.form.email
    };
  }

  render() {
    const ResetPassword = t.struct({
      email: Email
    });

    const buttonLabel = this.props.form.isLoading ? 'Enviando...' : 'Enviar';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Redefinir senha</Text>
          <Text style={styles.info}>Insira seu email abaixo:</Text>
          <Form ref='form' type={ResetPassword} options={this.props.form} value={this.getFormValue()} />
          <Text style={styles.info}>Você receberá em seu email um link para redefinir sua senha.</Text>
          <Button
            containerStyle={styles.button}
            text={buttonLabel}
            disabled={this.props.form.isLoading}
            onPress={this._sendResetPassword.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.forgotPassword
  };
}

export default connect(select)(ForgotPassword);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 55 : 0
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    marginTop: 20
  }
});
