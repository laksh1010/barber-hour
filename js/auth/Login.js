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
  Linking
} from 'react-native';

import { connect } from 'react-redux';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import { loginWithFacebook, login } from '../actions/auth';

import CustomerMain from '../customer/Main';
import BarberMain from '../barber/Main';
import Signup from './Signup';
import FacebookButton from './FacebookButton';
import Logo from '../common/Logo';
import Button from '../common/Button';
import TextSeparator from '../common/TextSeparator';
import LargeButton from '../common/LargeButton';
import ForgotPassword from './ForgotPassword';
import NewPasswordForm from './NewPasswordForm';
import Email from '../forms/Email';
import PushNotifications from '../PushNotifications';

class Login extends Component {
  _openForgotPassowrd() {
    if (!this.props.form.isLoading) {
      this.props.navigator.push({
        component: ForgotPassword
      });
    }
  }

  _openSignup() {
    this.props.navigator.replace({
      component: Signup,
      passProps: { skipDeepLinking: this.props.skipDeepLinking }
    });
  }

  _login() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(login(value));
    }
  }

  _onFacebookLogin(event) {
    if (!this.props.form.isLoading) {
      this.props.dispatch(loginWithFacebook(event));
    }
  }

  componentDidMount() {
    var url = Linking.getInitialURL().then((url) => {
      if (url && !this.props.skipDeepLinking) {
        this._handleURL(url);
      }
    })
  }

  _handleURL(url) {
    var [action, params] = url.split('://')[1].split('?');

    if (action === 'reset-password') {
      var [param, value] = params.split('=');

      if (param === 'token' && value) {
        this.props.navigator.resetTo({
          component: NewPasswordForm,
          passProps: { token: value }
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      var component = this.props.type === 'Barber' ? BarberMain : CustomerMain;
      this.props.navigator.replace({component: component});
    }
  }

  getFormValue() {
    return {
      email: this.props.form.email,
      password: this.props.form.password
    };
  }

  render() {
    const Login = t.struct({
      email: Email,
      password: t.String
    });

    const buttonLabel = this.props.form.isLoading ? 'Entrando...' : 'Entrar';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.formContainer}>
          <View>
            <Form ref='form' type={Login} options={this.props.form} value={this.getFormValue()} />
            <Button
              containerStyle={styles.button}
              text={buttonLabel}
              disabled={this.props.form.isLoading}
              onPress={this._login.bind(this)} />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <Text>Esqueceu sua senha? </Text>
            <TouchableOpacity onPress={this._openForgotPassowrd.bind(this)}>
              <Text style={styles.link}>Redefinir senha.</Text>
            </TouchableOpacity>
          </View>
          <TextSeparator style={styles.separatorContainer} />
          <FBLogin
            buttonView={
              <FacebookButton
                style={styles.facebookButton}
                text='Entrar com o Facebook'
                disabled={this.props.form.isLoading}/>
            }
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={['email']}
            onLogin={this._onFacebookLogin.bind(this)} />
        </View>
        <View style={styles.signupContainer}>
          <LargeButton
            text='Não tem uma conta? '
            linkText='Cadastre-se.'
            disabled={this.props.form.isLoading}
            onPress={this._openSignup.bind(this)} />
        </View>
        <PushNotifications />
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.login,
    isLoggedIn: store.user.isLoggedIn,
    type: store.user.type
  };
}

export default connect(select)(Login);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  logo: {
    width: 140,
    height: 140
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    marginTop: 10
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  link: {
    fontWeight: 'bold'
  },
  facebookButton: {
    marginTop: 10,
  },
  separatorContainer: {
    marginTop: 5,
  },
  signupContainer: {
    height: 55
  }
});
