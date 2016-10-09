import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Button from '../common/Button';
import Main from '../customer/Main';
import Toolbar from '../common/Toolbar';
import PhoneForm from './PhoneForm';
import FindCityFromGPS from './FindCityFromGPS';
import formStyle from '../forms/style';

import { startPhoneVerification, verifyPhone } from '../actions/verifyPhone';

class VerifyPhone extends Component {
  _verifyPhone() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(verifyPhone(value));
    }
  }

  _resendCode() {
    if (!this.props.form.isResequestingCode) {
      this.props.dispatch(startPhoneVerification({ phone: this.props.phone }));
    }
  }

  _editNumber() {
    const route = {
      component: PhoneForm,
      title: 'Barber Hour',
      passProps: { edit: true }
    };

    this.props.navigator.replace(route);
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      var component = this.props.city ? Main : FindCityFromGPS;
      const route = {
        component: component,
        title: 'Barber Hour'
      };

      this.props.navigator.replace(route);
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
    const linkText = this.props.form.isResequestingCode ? 'Enviando...' : 'Enviar novamente';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={this.props.form.isLoading || this.props.form.isResequestingCode} />
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
            disabled={this.props.form.isLoading || this.props.form.isResequestingCode}
            onPress={this._verifyPhone.bind(this)} />
          <View style={styles.linkContainer}>
            <Text style={formStyle.helpBlock.normal}>Não recebeu o cógido?</Text>
            <TouchableOpacity onPress={this._resendCode.bind(this)}>
              <Text style={[formStyle.helpBlock.normal, styles.link]}>{linkText}</Text>
            </TouchableOpacity>
            <Text style={formStyle.helpBlock.normal}>ou</Text>
            <TouchableOpacity onPress={this._editNumber.bind(this)}>
              <Text style={[formStyle.helpBlock.normal, styles.link]}>Alterar número de celular</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.verifyPhone,
    phone: store.user.phone,
    city: store.user.city
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
  },
  link: {
    fontWeight: 'bold'
  },
  linkContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
