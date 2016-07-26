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
import Main from '../customer/Main';
import Toolbar from '../common/Toolbar';

import { verifyPhone } from '../actions/verifyPhone';

class VerifyPhone extends Component {
  _verifyPhone() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(verifyPhone(value));
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.resetTo({
        component: Main,
        title: 'Barber Hour'
      });
    }
  }

  getFormValue() {
    return {
      verification_code: this.props.form.verification_code
    };
  }

  render() {
    const VerifyCode = t.struct({verification_code: t.String});
    const buttonLabel = this.props.form.isLoading ? 'Confirmando...' : 'Confimar cadastro';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Confirmar número</Text>
          <Text style={styles.info}>Insira o código recebido por SMS:</Text>
          <View style={styles.formContainer}>
            <Form ref='form' type={VerifyCode} options={this.props.form} value={this.getFormValue()} />
          </View>
          <Button
            containerStyle={styles.button}
            text={buttonLabel}
            disabled={this.props.form.isLoading}
            onPress={this._verifyPhone.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.verifyPhone
  };
}

export default connect(select)(VerifyPhone);

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
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  formContainer: {
    marginTop: 10
  }
});
