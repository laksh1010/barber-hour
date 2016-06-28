import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput
} from 'react-native';

import Button from '../common/Button';
import ServicesForm from './ServicesForm';
import Toolbar from '../common/Toolbar';

export default class BarberAddressForm extends Component {
  _openServicesForm() {
    this.props.navigator.resetTo({
      component: ServicesForm
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Endereço</Text>
          <Text style={styles.info}>Cadastre o endereço de sua barbearia:</Text>
          <TextInput style={styles.firstInput} placeholder='CEP' keyboardType='numeric' />
          <TextInput placeholder='rua' />
          <View style={styles.row}>
            <TextInput style={styles.districtInput} placeholder='bairro' />
            <TextInput style={styles.numberInput} placeholder='número' keyboardType='numeric' />
          </View>
          <Button containerStyle={styles.button} text='Avançar' onPress={this._openServicesForm.bind(this)} />
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
  firstInput: {
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
  },
  numberInput: {
    flex: .3
  },
  districtInput: {
    flex: .7
  }
});
