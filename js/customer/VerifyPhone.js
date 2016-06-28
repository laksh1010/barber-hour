import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput
} from 'react-native';

import Button from '../common/Button';
import Main from '../customer/Main';
import Toolbar from '../common/Toolbar';

export default class VerifyPhone extends Component {
  _openMain() {
    this.props.navigator.resetTo({
      component: Main
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Confirmar número</Text>
          <Text style={styles.info}>Insira o código recebido por SMS:</Text>
          <TextInput style={styles.input} placeholder='código' />
          <Button containerStyle={styles.button} text='Confimar cadastro' onPress={this._openMain.bind(this)} />
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
