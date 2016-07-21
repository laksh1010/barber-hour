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
import {FBLoginManager} from 'react-native-facebook-login';

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
import CustomerMain from '../customer/Main';
import BarberMain from '../barber/Main';

import { loginWithFacebook } from '../actions/auth';

class Signup extends Component {
  _openLogin() {
    this.props.navigator.replace({
      component: Login,
      passProps: { skipDeepLinking: this.props.skipDeepLinking }
    });
  }

  _openPrivacyPolicy() {
    this.props.navigator.push({
      component: PrivacyPolicy,
      title: 'Política de privacidade'
    });
  }

  _openServiceTerms() {
    this.props.navigator.push({
      component: ServiceTerms,
      title: 'Termos de uso'
    });
  }

  _openSignupForm() {
    this.props.navigator.replace({
      component: SignupForm,
      passProps: { skipDeepLinking: this.props.skipDeepLinking },
      title: 'Barber Hour'
    });
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      let component = AccountTypeSelector;

      if (this.props.type === 'Barber') {
        component = BarberMain;
      } else if (this.props.type === 'Customer') {
        component = CustomerMain;
      }

      this.props.navigator.replace({component: component, title: 'Barber Hour'});
    }
  }

  _onFacebookLogin() {
    FBLoginManager.loginWithPermissions(['email', 'public_profile'], (error, data) => {
      if (!error) {
        console.log('Login data: ', data);
        this.props.dispatch(loginWithFacebook(data));
      } else {
        console.log('Error: ', data);
      }
    });
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
          <Button
            outline
            text='Cadastrar-se com o Facebook'
            onPress={this._onFacebookLogin.bind(this)} />
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
    type: store.user.type,
    isLoggedIn: store.user.isLoggedIn
  }
}

export default connect(select)(Signup);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 70 : 0
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
