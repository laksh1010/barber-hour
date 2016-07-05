import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput
} from 'react-native';

import { connect } from 'react-redux';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Button from '../common/Button';
import ServicesForm from './ServicesForm';
import Toolbar from '../common/Toolbar';

import { createAddress, loadZipcode, setEditMode, updateAddress } from '../actions/address';

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
      this.props.dispatch(setEditMode());
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      if (this.props.edit) {
        this.props.navigator.pop();
      } else {
        this.props.navigator.resetTo({
          component: ServicesForm
        });
      }
    }
  }

  getFormValue() {
    return {
      zipcode: this.props.form.zipcode,
      street: this.props.form.street,
      district: this.props.form.district,
      number: this.props.form.number
    };
  }

  loadZipcode() {
    var zipcode = this.refs.form.getComponent('zipcode').props.value
    if (zipcode) {
      this.props.dispatch(loadZipcode(zipcode));
    }
  }

  render() {
    const Address = t.struct({
      zipcode: t.String,
      street: t.String,
      district: t.String,
      number: t.Number
    });

    var formOptions = this.props.form;
    formOptions.fields.zipcode.onBlur = this.loadZipcode.bind(this);

    var buttonLabel = this.props.edit ? 'Alterar' : 'Avançar';
    var infoPrefix = this.props.edit ? 'Altere' : 'Cadastre';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Endereço</Text>
          <Text style={styles.info}>{infoPrefix} o endereço de sua barbearia:</Text>
          <View style={styles.formContainer}>
            <Form ref='form' type={Address} options={formOptions} value={this.getFormValue()} />
          </View>
          <Button containerStyle={styles.button} text={buttonLabel} onPress={this._createAddress.bind(this)} />
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
