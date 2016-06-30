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

import Login from './Login';
import Logo from '../common/Logo';
import Button from '../common/Button';
import LargeButton from '../common/LargeButton';
import AccountTypeSelector from './AccountTypeSelector';

import { signup } from '../actions/login';

const Email = t.refinement(t.String, (string) => string.includes('@') && string.includes('.'));

const User = t.struct({
  name: t.String,
  email: Email,
  password: t.String,
  password_confirmation: t.String
});

const formOptions = {
  auto: 'none',
  fields: {
    name: {
      placeholder: 'nome',
      error: <Text style={{color: '#DB162F', fontSize: 14}}>digite o nome</Text>,
      stylesheet: stylesheet
    },
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
    },
    password_confirmation: {
      placeholder: 'confirme a senha',
      secureTextEntry: true,
      maxLength: 72,
      error: <Text style={{color: '#DB162F', fontSize: 14}}>deve ter pelo menos 8 caracteres</Text>,
      stylesheet: stylesheet
    }
  }
};

class SignupForm extends Component {
  _openLogin() {
    this.props.navigator.replace({
      component: Login
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
    if (this.props.user.isLoggedIn) {
      this.props.navigator.replace({
        component: AccountTypeSelector
      });
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.formContainer}>
          <View>
            <Form ref='form' type={User} options={formOptions} value={this.props.user} />
            <Button containerStyle={styles.button} text='Cadastrar-se' onPress={this._signup.bind(this)} />
          </View>
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
    user: store.user
  };
}

export default connect(select)(SignupForm);

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
