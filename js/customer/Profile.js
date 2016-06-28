import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from '../auth/Login';
import PrivacyPolicy from '../auth/PrivacyPolicy';
import ServiceTerms from '../auth/ServiceTerms';
import EditProfile from '../auth/EditProfile';
import EditPassword from '../auth/EditPassword';

export default class Profile extends Component {
  _editProfile() {
    this.props.navigator.push({
      component: EditProfile
    });
  }

  _editPassword() {
    this.props.navigator.push({
      component: EditPassword
    });
  }

  _openServiceTerms() {
    this.props.navigator.push({
      component: ServiceTerms
    });
  }

  _openPrivacyPolicy() {
    this.props.navigator.push({
      component: PrivacyPolicy
    });
  }

  _logout() {
    this.props.navigator.resetTo({
      component: Login
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <View style={styles.account}>
          <Text style={styles.header}>Conta</Text>
          <TouchableNativeFeedback
            onPress={this._editProfile.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.item}>
              <Text style={styles.subtitle}>Editar conta</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={this._editPassword.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.item}>
              <Text style={styles.subtitle}>Alterar senha</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={styles.about}>
          <Text style={styles.header}>Sobre</Text>
            <TouchableNativeFeedback
              onPress={this._openServiceTerms.bind(this)}
              background={TouchableNativeFeedback.SelectableBackground()}>
              <View style={styles.item}>
                <Text style={styles.subtitle}>Termos de uso</Text>
              </View>
            </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={this._openPrivacyPolicy.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.item}>
              <Text style={styles.subtitle}>Política de privacidade</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <TouchableNativeFeedback
          onPress={this._logout.bind(this)}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={[styles.item, styles.lastItem]}>
            <Text style={styles.subtitle}>Sair</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14
  },
  account: {
    marginBottom: 10
  },
  item: {
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexWrap: 'wrap'
  },
  lastItem: {
    borderBottomWidth: 0,
    marginTop: 10
  }
});
