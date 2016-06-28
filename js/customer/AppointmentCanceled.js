import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

import Logo from '../common/Logo';
import Button from '../common/Button';
import Main from './Main';

export default class AppointmentCanceled extends Component {
  _openMain() {
    this.props.navigator.replace({
      component: Main
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Horário cancelado :/</Text>
          <Text style={styles.info}>Seu horário foi cancelado.</Text>
          <Text style={styles.info}>O barbeiro será notificado do cancelamento.</Text>
          <Button containerStyle={styles.button} text='Voltar' onPress={this._openMain.bind(this)} />
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
    marginTop: 20,
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
