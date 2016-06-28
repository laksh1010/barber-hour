import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

import Logo from '../common/Logo';
import Button from '../common/Button';
import Login from './Login';

export default class ResetPasswordSent extends Component {
  _openLogin() {
    this.props.navigator.replace({
      component: Login
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Redefinir senha</Text>
          <Text style={styles.info}>Você receberá o email em alguns minutos.</Text>
          <Button containerStyle={styles.button} text='Voltar' onPress={this._openLogin.bind(this)} />
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
  logo: {
    marginTop: 20
  },
  button: {
    marginTop: 20,
  },
});
