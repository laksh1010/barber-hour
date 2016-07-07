import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import { connect } from 'react-redux';

import Button from '../common/Button';
import SelectableImageButton from '../common/SelectableImageButton';
import PhoneForm from '../customer/PhoneForm';
import AddressForm from '../barber/AddressForm';
import formStyle from '../forms/style';

import { chooseType, addError } from '../actions/account';

class AccountTypeSelector extends Component {
  _setAccountType(type) {
    this.props.dispatch(chooseType({type}));
  }

  _openNextStep() {
    if (this.props.accountType === 'Customer') {
      this.props.navigator.push({
        component: PhoneForm
      });
    } else if (this.props.accountType === 'Barber') {
      this.props.navigator.push({
        component: AddressForm
      });
    } else {
      this.props.dispatch(addError());
    }
  }

  render() {
    var errorMessage;

    if (this.props.error) {
      errorMessage = <Text style={formStyle.errorBlock}>Por favor, selecione uma opção acima.</Text>;
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Text style={styles.greeting}>Olá, {this.props.name}!</Text>
        <Text style={styles.question}>Você deseja usar o aplicativo como:</Text>
        <View style={styles.accountTypeContainer}>
          <SelectableImageButton
            containerStyle={styles.buttonContainer}
            onPress={() => {this._setAccountType('Customer')}}
            icon='moustache'
            text='Cliente'
            disabled={this.props.isLoading}
            selected={this.props.accountType === 'Customer'} />
          <SelectableImageButton
            containerStyle={styles.buttonContainer}
            onPress={() => {this._setAccountType('Barber')}}
            icon='razor'
            text='Barbeiro'
            disabled={this.props.isLoading}
            selected={this.props.accountType === 'Barber'} />
        </View>
        {errorMessage}
        <Button
          containerStyle={styles.button}
          text='Avançar'
          disabled={this.props.isLoading}
          onPress={this._openNextStep.bind(this)} />
      </View>
    );
  }
}

function select(store) {
  return {
    name: store.user.name,
    email: store.user.email,
    accountType: store.user.type,
    error: store.user.error,
    isLoading: store.user.isLoading
  };
}

export default connect(select)(AccountTypeSelector);

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
