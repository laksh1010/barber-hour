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
import VerifyPhone from './VerifyPhone';

import { startPhoneVerification } from '../actions/auth';

class PhoneForm extends Component {
  _sendConfirmation() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(startPhoneVerification(value));
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.push({
        component: VerifyPhone
      });
    }
  }

  getFormValue() {
    return {
      phone: this.props.form.phone
    };
  }

  render() {
    const Login = t.struct({phone: t.String});

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Confirmar número</Text>
          <Text style={styles.info}>Insira seu número de celular abaixo:</Text>
          <View style={styles.formContainer}>
            <Form ref='form' type={Login} options={this.props.form} value={this.getFormValue()} />
          </View>
          <Text style={styles.info}>Você receberá um SMS com um código para finalizar seu cadastro.</Text>
          <Button containerStyle={styles.button} text='Enviar' onPress={this._sendConfirmation.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.startPhoneVerification
  };
}

export default connect(select)(PhoneForm);

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
  info: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  formContainer: {
    marginTop: 10
  }
});
