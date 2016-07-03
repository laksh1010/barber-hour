import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback
} from 'react-native';

import { connect } from 'react-redux';

import AddressForm from './AddressForm';
import ImageChooser from './ImageChooser';
import ScheduleBuilder from './ScheduleBuilder';
import ServicesForm from './ServicesForm';
import Login from '../auth/Login';
import PrivacyPolicy from '../auth/PrivacyPolicy';
import ServiceTerms from '../auth/ServiceTerms';
import EditProfile from '../auth/EditProfile';
import EditPassword from '../auth/EditPassword';

import { logout } from '../actions/auth';

class Profile extends Component {
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

  _editAddress() {
    this.props.navigator.push({
      component: AddressForm,
      passProps: { edit: true }
    });
  }

  _editImages() {
    this.props.navigator.push({
      component: ImageChooser
    });
  }

  _scheduleBuilder() {
    this.props.navigator.push({
      component: ScheduleBuilder
    });
  }

  _editServices() {
    this.props.navigator.push({
      component: ServicesForm,
      passProps: { edit: true }
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

    this.props.dispatch(logout());
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
          <TouchableNativeFeedback
            onPress={this._editAddress.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.item}>
              <Text style={styles.subtitle}>Alterar endereço</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={this._editImages.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.item}>
              <Text style={styles.subtitle}>Alterar fotos</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={this._scheduleBuilder.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.item}>
              <Text style={styles.subtitle}>Alterar modelo de agenda</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={this._editServices.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.item}>
              <Text style={styles.subtitle}>Alterar serviços disponíveis</Text>
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

export default connect()(Profile);

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
