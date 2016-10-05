import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Button from '../common/Button';
import ServicesForm from './ServicesForm';
import Toolbar from '../common/Toolbar';

import { createAddress, loadZipcode, getAddress, updateAddress } from '../actions/address';

class AddressForm extends Component {
  _createAddress() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      if (this.props.edit) {
        this.props.dispatch(updateAddress(value));
      } else {
        this.props.dispatch(createAddress(value));
      }
    }
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.dispatch(getAddress());
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      if (this.props.edit) {
        this.props.navigator.pop();
      } else {
        const route = {
          component: ServicesForm,
          title: 'Serviços'
        };

        Platform.OS === 'ios' ? this.props.navigator.replace(route) : this.props.navigator.resetTo(route);
      }
    }
  }

  getFormValue() {
    return {
      zipcode: this.props.form.zipcode,
      street: this.props.form.street,
      district: this.props.form.district,
      number: this.props.form.number,
      city: this.props.form.city,
      state: this.props.form.state
    };
  }

  loadZipcode() {
    var zipcode = this.refs.form.getComponent('zipcode').props.value
    if (zipcode) {
      this.props.dispatch(loadZipcode(zipcode));
    }
  }

  _getButtonLabel() {
    if (this.props.edit) {
      return this.props.isLoading ? 'Alterando...' : 'Alterar';
    } else {
      return this.props.isLoading ? 'Cadastrando...' : 'Avançar';
    }
  }

  render() {
    const Address = t.struct({
      zipcode: t.String,
      street: t.String,
      district: t.String,
      number: t.Number,
      city: t.String,
      state: t.String,
    });

    var formOptions = this.props.form;
    formOptions.fields.zipcode.onBlur = this.loadZipcode.bind(this);

    var infoPrefix = this.props.edit ? 'Altere' : 'Cadastre';
    var content;
    if (this.props.form.isRequestingInfo) {
      content = <ActivityIndicator size='small' />;
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={this.props.form.isLoading || this.props.form.isRequestingInfo} />
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Endereço</Text>
          <Text style={styles.info}>{infoPrefix} o endereço da barbearia:</Text>
          {content}
          <View style={styles.formContainer}>
            <Form ref='form' type={Address} options={formOptions} value={this.getFormValue()} />
          </View>
          <Button
            containerStyle={styles.button}
            text={this._getButtonLabel()}
            disabled={this.props.form.isLoading || this.props.form.isRequestingInfo}
            onPress={this._createAddress.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.address
  };
}

export default connect(select)(AddressForm);

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
