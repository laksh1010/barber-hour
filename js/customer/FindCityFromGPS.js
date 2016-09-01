import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import { getGeolocation } from '../actions/position';
import Toolbar from '../common/Toolbar';
import SearchCity from './SearchCity';

class FindCityFromGPS extends Component {
  componentDidMount() {
    if (!this.props.city) {
      this.getGeolocation();
    }
  }

  getGeolocation() {
    this.props.dispatch(getGeolocation());
  }

  _openSearchCity() {
    this.props.navigator.push({
      component: SearchCity,
      title: 'Escolher cidade'
    });
  }

  render() {
    var content;
    var {isLoading, error} = this.props.position;

    if (isLoading) {
      content = (
        <View>
          <Text style={styles.info}>Buscando localização via GPS</Text>
          <ActivityIndicator />
        </View>
      );
    } else if (error) {
      content = (
        <View style={styles.errorContainer}>
          <Text style={styles.info}>Não foi possível obter sua localização.</Text>
          <TouchableOpacity onPress={this._openSearchCity.bind(this)}>
            <Text style={styles.link}>Por favor, digite sua cidade.</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.city) {
      content = <Text style={styles.info}>Cidade encontrada: {this.props.city.name} - {this.props.city.state.initials}</Text>
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Escolher cidade</Text>
          <View style={styles.formContainer}>{content}</View>
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    position: store.position,
    city: store.user.city
  };
}

export default connect(select)(FindCityFromGPS);

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
  formContainer: {
    marginTop: 10
  },
  errorContainer: {
    justifyContent: 'center',
    marginTop: 10
  },
  link: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
