import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { connect } from 'react-redux';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import { loginWithFacebook, login } from '../actions/auth';

import Main from '../customer/Main';
import Signup from './Signup';
import FacebookButton from './FacebookButton';
import Logo from '../common/Logo';
import Button from '../common/Button';
import TextSeparator from '../common/TextSeparator';
import LargeButton from '../common/LargeButton';
import ForgotPassword from './ForgotPassword';

class Login extends Component {
  _openForgotPassowrd() {
    this.props.navigator.push({
      component: ForgotPassword
    });
  }

  _openSignup() {
    this.props.navigator.replace({
      component: Signup
    });
  }

  _login() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(login(value));
    }
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.navigator.replace({
        component: Main
      });
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
      email: t.refinement(t.String, (string) => string.includes('@') && string.includes('.')),
      password: t.String
    });

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.formContainer}>
          <View>
            <Form ref='form' type={Login} options={this.props.form} value={this.getFormValue()} />
            <Button containerStyle={styles.button} text='Entrar' onPress={this._login.bind(this)} />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <Text>Esqueceu sua senha? </Text>
            <TouchableOpacity onPress={this._openForgotPassowrd.bind(this)}>
              <Text style={styles.link}>Redefinir senha.</Text>
            </TouchableOpacity>
          </View>
          <TextSeparator style={styles.separatorContainer} />
          <FBLogin
            buttonView={<FacebookButton style={styles.facebookButton} text='Entrar com o Facebook'/>}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={['email']}
            onLogin={(event) => this.props.dispatch(loginWithFacebook(event))} />
        </View>
        <View style={styles.signupContainer}>
          <LargeButton text='Não tem uma conta? ' linkText='Cadastre-se.' onPress={this._openSignup.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.login,
    isLoggedIn: store.user.isLoggedIn
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
