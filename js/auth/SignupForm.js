import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Login from './Login';
import Logo from '../common/Logo';
import Button from '../common/Button';
import LargeButton from '../common/LargeButton';
import AccountTypeSelector from './AccountTypeSelector';
import Email from '../forms/Email';

import { signup } from '../actions/account';

class SignupForm extends Component {
  _openLogin() {
    this.props.navigator.replace({
      component: Login,
      passProps: { skipDeepLinking: this.props.skipDeepLinking },
      title: 'Barber Hour'
    });
  }

  _signup() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(signup(value));
    }
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.navigator.replace({
        component: AccountTypeSelector,
        title: 'Tipo de conta'
      });
    }
  }

  getFormValue() {
    return {
      name: this.props.form.name,
      email: this.props.form.email,
      password: this.props.form.password,
      password_confirmation: this.props.form.password_confirmation
    };
  }

  render() {
    const Signup = t.struct({
      name: t.String,
      email: Email,
      password: t.String,
      password_confirmation: t.String
    });

    const buttonLabel = this.props.form.isLoading ? 'Cadastrando...' : 'Cadastrar-se';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.formContainer}>
          <View>
            <Form ref='form' type={Signup} options={this.props.form} value={this.getFormValue()} />
            <Button
              containerStyle={styles.button}
              text={buttonLabel}
              disabled={this.props.form.isLoading}
              onPress={this._signup.bind(this)} />
          </View>
        </View>
        <View style={styles.signupContainer}>
          <LargeButton
            text='Já possui uma conta? '
            linkText='Entrar.'
            disabled={this.props.form.isLoading}
            onPress={this._openLogin.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.signup,
    isLoggedIn: store.user.isLoggedIn
  };
}

export default connect(select)(SignupForm);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 70 : 0
  },
  logo: {
    width: 140,
    height: 140
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  privacyContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  separatorContainer: {
    marginBottom: 10
  },
  row: {
    flexDirection: 'row'
  },
  signupContainer: {
    height: 55,
  },
});
