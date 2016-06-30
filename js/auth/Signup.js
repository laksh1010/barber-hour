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

import Main from '../customer/Main';
import BarberList from '../customer/BarberList';
import Login from './Login';
import FacebookButton from './FacebookButton';
import Logo from '../common/Logo';
import Button from '../common/Button';
import TextSeparator from '../common/TextSeparator';
import LargeButton from '../common/LargeButton';
import AccountTypeSelector from './AccountTypeSelector';
import PrivacyPolicy from './PrivacyPolicy';
import ServiceTerms from './ServiceTerms';
import SignupForm from './SignupForm';

import { loginWithFacebook } from '../actions/login';

class Signup extends Component {
  _openLogin() {
    this.props.navigator.replace({
      component: Login
    });
  }

  _openPrivacyPolicy() {
    this.props.navigator.push({
      component: PrivacyPolicy
    });
  }

  _openServiceTerms() {
    this.props.navigator.push({
      component: ServiceTerms
    });
  }

  _openSignupForm() {
    this.props.navigator.replace({
      component: SignupForm
    });
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.navigator.replace({
        component: Main
      });
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo />
        <View style={styles.formContainer}>
          <Button containerStyle={styles.button} text='Cadastrar-se' onPress={this._openSignupForm.bind(this)} />
          <View style={styles.privacyContainer}>
            <Text>Ao se cadastrar, você concorda com os </Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={this._openServiceTerms.bind(this)}>
                <Text style={styles.link}>Termos de uso</Text>
              </TouchableOpacity>
              <Text> & com a </Text>
              <TouchableOpacity onPress={this._openPrivacyPolicy.bind(this)}>
                <Text style={styles.link}>política de privacidade</Text>
              </TouchableOpacity>
              <Text>.</Text>
            </View>
          </View>
          <TextSeparator style={styles.separatorContainer} />
          <FBLogin
            buttonView={<FacebookButton text='Cadastrar-se com o Facebook'/>}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={['email']}
            onLogin={(event) => this.props.dispatch(loginWithFacebook(event))} />
        </View>
        <View style={styles.signupContainer}>
          <LargeButton text='Já possui uma conta? ' linkText='Entrar.' onPress={this._openLogin.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn
  }
}

export default connect(select)(Signup);

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
