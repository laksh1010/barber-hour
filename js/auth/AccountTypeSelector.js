import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import Button from '../common/Button';
import SelectableImageButton from '../common/SelectableImageButton';
import PhoneForm from '../customer/PhoneForm';
import AddressForm from '../barber/AddressForm';

export default class AccountTypeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: 'customer'
    }
  }

  _setAccountType(accountType) {
    this.setState({accountType});
  }

  _openNextStep() {
    if (this.state.accountType === 'customer') {
      this.props.navigator.push({
        component: PhoneForm
      });
    } else {
      this.props.navigator.push({
        component: AddressForm
      });
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Text style={styles.greeting}>Olá, {this.props.user.name}!</Text>
        <Text style={styles.question}>Você deseja usar o aplicativo como:</Text>
        <View style={styles.accountTypeContainer}>
          <SelectableImageButton
            containerStyle={styles.buttonContainer}
            onPress={() => {this._setAccountType('customer')}}
            icon='moustache'
            text='Cliente'
            selected={this.state.accountType === 'customer'} />
          <SelectableImageButton
            containerStyle={styles.buttonContainer}
            onPress={() => {this._setAccountType('barber')}}
            icon='razor'
            text='Barbeiro'
            selected={this.state.accountType === 'barber'} />
        </View>
        <Button containerStyle={styles.button} text='Avançar' onPress={this._openNextStep.bind(this)} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  greeting: {
    fontSize: 24,
    textAlign: 'center'
  },
  question: {
    fontSize: 16,
    textAlign: 'center'
  },
  accountTypeContainer: {
    marginTop: 20
  },
  button: {
    marginTop: 20
  }
});
