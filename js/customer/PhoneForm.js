import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput
} from 'react-native';

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import VerifyPhone from './VerifyPhone';

export default class PhoneForm extends Component {
  _sendConfirmation() {
    this.props.navigator.push({
      component: VerifyPhone
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Confirmar número</Text>
          <Text style={styles.info}>Insira seu número de celular abaixo:</Text>
          <TextInput style={styles.input} placeholder='número de celular' keyboardType='numeric' />
          <Text style={styles.info}>Você receberá um SMS com um código para finalizar seu cadastro.</Text>
          <Button containerStyle={styles.button} text='Enviar' onPress={this._sendConfirmation.bind(this)} />
        </View>
      </View>
    );
  }
}

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
  input: {
    marginTop: 10
  }
});
