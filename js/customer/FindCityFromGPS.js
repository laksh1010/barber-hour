import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import { getGeolocation } from '../actions/position';
import Toolbar from '../common/Toolbar';
import SearchCity from './SearchCity';
import Main from './Main';

class FindCityFromGPS extends Component {
  componentDidMount() {
    this.getGeolocation();
  }

  getGeolocation() {
    this.props.dispatch(getGeolocation());
  }

  componentDidUpdate(prevProps) {
    if (this.props.position.error !== prevProps.position.error) {
      return;
    }

    if (this.props.city) {
      if (this.props.edit) {
        this.props.navigator.pop();
      } else {
        this.props.navigator.replace({
          component: Main,
          title: 'Barber Hour'
        });
      }
    }
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
          <Text style={styles.info}>Por favor, digite sua cidade.</Text>
          <SearchCity />
        </View>
      );
    } else if (this.props.city) {
      content = <Text style={styles.info}>Cidade encontrada: {this.props.city.name} - {this.props.city.state.initials}</Text>
    }

    return(
      <ScrollView style={styles.scrollContainer} automaticallyAdjustContentInsets={false}>
        <View style={styles.container}>
          <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={isLoading} />
          <Toolbar backIcon={this.props.edit} navigator={this.props.navigator} />
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Escolher cidade</Text>
            <View style={styles.formContainer}>{content}</View>
          </View>
        </View>
      </ScrollView>
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
  scrollContainer: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 55 : 0
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 10,
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
