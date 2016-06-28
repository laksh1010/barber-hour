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

export default class EditProfile extends Component {
  _update() {
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Editar conta</Text>
          <TextInput placeholder='nome' />
          <TextInput placeholder='email' keyboardType='email-address' />
          <Button containerStyle={styles.button} text='Alterar' onPress={this._update.bind(this)} />
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
  button: {
    marginTop: 20
  },
});
