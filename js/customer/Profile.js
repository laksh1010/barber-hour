import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';

import { connect } from 'react-redux';

import Login from '../auth/Login';
import PrivacyPolicy from '../auth/PrivacyPolicy';
import ServiceTerms from '../auth/ServiceTerms';
import EditProfile from '../auth/EditProfile';
import EditPassword from '../auth/EditPassword';
import ReviewBarberList from '../admin/ReviewBarberList';
import Touchable from '../common/Touchable';

import { logout } from '../actions/auth';

class Profile extends Component {
  _editProfile() {
    this.props.navigator.push({
      component: EditProfile,
      title: 'Editar perfil'
    });
  }

  _editPassword() {
    this.props.navigator.push({
      component: EditPassword,
      title: 'Editar senha'
    });
  }

  _openServiceTerms() {
    this.props.navigator.push({
      component: ServiceTerms,
      title: 'Termos de uso'
    });
  }

  _openPrivacyPolicy() {
    this.props.navigator.push({
      component: PrivacyPolicy,
      title: 'Política de privacidade'
    });
  }

  _logout() {
    const route = {
      component: Login,
      title: 'Barber Hour'
    };

    if (Platform.OS === 'ios') {
      this.props.navigator.replace(route);
    } else {
      this.props.navigator.resetTo(route);
    }

    this.props.dispatch(logout());
  }

  _reviewBarbers() {
    this.props.navigator.push({
      component: ReviewBarberList,
      title: 'Revisar barbearias'
    });
  }

  render() {
    var content;
    if (this.props.isAdmin) {
      content = (
        <Touchable
          style={styles.item}
          onPress={this._reviewBarbers.bind(this)}>
          <Text style={styles.subtitle}>Revisar barbearias</Text>
        </Touchable>
      )
    };

    return(
      <View style={styles.container}>
        <View style={styles.account}>
          <Text style={styles.header}>Conta</Text>
          <Touchable
            style={styles.item}
            onPress={this._editProfile.bind(this)}>
            <Text style={styles.subtitle}>Editar conta</Text>
          </Touchable>
          <Touchable
            style={styles.item}
            onPress={this._editPassword.bind(this)}>
            <Text style={styles.subtitle}>Alterar senha</Text>
          </Touchable>
          {content}
        </View>

        <View style={styles.about}>
          <Text style={styles.header}>Sobre</Text>
            <Touchable
              style={styles.item}
              onPress={this._openServiceTerms.bind(this)}>
              <Text style={styles.subtitle}>Termos de uso</Text>
            </Touchable>
          <Touchable
            style={styles.item}
            onPress={this._openPrivacyPolicy.bind(this)}>
            <Text style={styles.subtitle}>Política de privacidade</Text>
          </Touchable>
        </View>

        <Touchable
          style={[styles.item, styles.lastItem]}
          onPress={this._logout.bind(this)}>
          <Text style={styles.subtitle}>Sair</Text>
        </Touchable>
      </View>
    );
  }
}

function select(store) {
  return {
    isAdmin: store.user.admin
  };
}

export default connect(select)(Profile);

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
