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

import { loginWithFacebook, onLoginFound } from '../actions/login';

import Main from '../customer/Main';
import Signup from './Signup';
import FacebookButton from './FacebookButton';
import Toolbar from '../common/Toolbar';
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
    this.props.navigator.replace({
      component: Main
    });
  }

  render() {
    console.log('render Login', this.props)
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo />
        <View style={styles.formContainer}>
          <View>
            <TextInput placeholder='email' keyboardType='email-address' />
            <TextInput placeholder='senha' secureTextEntry={true} />
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
            permissions={["email"]}
            onLogin={(event) => this.props.dispatch(loginWithFacebook(event))}
            onLoginFound={(event) => this.props.dispatch(onLoginFound(event))}
            onLoginNotFound={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}}
          />
        </View>
        <LargeButton text='Não tem uma conta? ' linkText='Cadastre-se.' onPress={this._openSignup.bind(this)} />
      </View>
    );
  }
}

function select(store) {
  return {
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
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    marginTop: 5
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5
  },
  link: {
    fontWeight: 'bold'
  },
  facebookButton: {
    marginTop: 10,
    marginBottom: 10
  },
  separatorContainer: {
    marginTop: 5,
  },
});
