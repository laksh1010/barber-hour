import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';

import { updatePassword } from '../actions/account';

class EditPassword extends Component {
  _update() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(updatePassword(value));
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.pop();
    }
  }

  getFormValue() {
    return {
      password: this.props.form.password,
      password_confirmation: this.props.form.password_confirmation
    };
  }

  render() {
    const Password = t.struct({
      password: t.String,
      password_confirmation: t.String
    });

    const buttonLabel = this.props.form.isLoading ? 'Alterando...' : 'Alterar';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Alterar senha</Text>
          <Form ref='form' type={Password} options={this.props.form} value={this.getFormValue()} />
          <Button containerStyle={styles.button} text={buttonLabel} onPress={this._update.bind(this)} disabled={this.props.form.isLoading} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.password
  };
}

export default connect(select)(EditPassword);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 60 : 0
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
});
