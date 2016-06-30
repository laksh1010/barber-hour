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
let stylesheet = {
  ...Form.stylesheet,
  textbox: {
    normal: {
      padding: 0,
      paddingLeft: 5,
      paddingBottom: 10
    },
    error: {
      padding: 0,
      paddingLeft: 5,
      paddingBottom: 10
    }
  }
};

import { loginWithFacebook, login } from '../actions/login';

import Main from '../customer/Main';
import Signup from './Signup';
import FacebookButton from './FacebookButton';
import Toolbar from '../common/Toolbar';
import Logo from '../common/Logo';
import Button from '../common/Button';
import TextSeparator from '../common/TextSeparator';
import LargeButton from '../common/LargeButton';
import ForgotPassword from './ForgotPassword';

const Email = t.refinement(t.String, (string) => string.includes('@') && string.includes('.'));

const User = t.struct({
  email: Email,
  password: t.String
});

const formOptions = {
  auto: 'none',
  fields: {
    email: {
      placeholder: 'e-mail',
      keyboardType: 'email-address',
      error: <Text style={{color: '#DB162F', fontSize: 14}}>e-mail inválido</Text>,
      stylesheet: stylesheet
    },
    password: {
      placeholder: 'senha',
      secureTextEntry: true,
      maxLength: 72,
      error: <Text style={{color: '#DB162F', fontSize: 14}}>deve ter pelo menos 8 caracteres</Text>,
      stylesheet: stylesheet
    }
  }
};

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

  render() {
    let invalidLoginMessage = null;
    if (this.props.invalidLogin) {
      invalidLoginMessage = <Text style={styles.errorMessage}>Dados inválidos.</Text>;
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.formContainer}>
          <View>
            <Form ref='form' type={User} options={formOptions} value={{email: this.props.email, password: this.props.password}} />
            {invalidLoginMessage}
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
    email: store.user.email,
    password: store.user.password,
    invalidLogin: store.user.invalidLogin,
    isLoggedIn: store.user.isLoggedIn
  }
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
  },
  errorMessage: {
    color: '#DB162F',
    textAlign: 'center'
  }
});
