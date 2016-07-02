import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Switch
} from 'react-native';

import { connect } from 'react-redux';

import Button from '../common/Button';
import ImageChooser from './ImageChooser';

import { createServices, toggleService, changeServicePrice } from '../actions/services';

class ServicesForm extends Component {
  _createServices() {
    var selectedServices =
      this.props.form.services
        .filter(service => service.selected)
        .map(service => {
          return { name: service.name, price: service.price.replace(',', '.') }
        });
    this.props.dispatch(createServices(selectedServices));
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.resetTo({
        component: ImageChooser
      });
    }
  }

  toggleService(serviceID, value) {
    this.props.dispatch(toggleService(serviceID, value));
  }

  changeServicePrice(serviceID, price) {
    this.props.dispatch(changeServicePrice(serviceID, price));
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Serviços</Text>
          <Text style={styles.info}>Selecione os serviços que você realiza:</Text>
          <View style={styles.formContainer}>
            {this.props.form.services.map((service) => {
              var price = service.selected ? (
                <TextInput
                  style={styles.servicePrice}
                  onChangeText={(text) => {this.changeServicePrice(service.id, text)}}
                  placeholder='preço (R$)'
                  keyboardType='numeric' />
              ) : <View />;

              return(
                <View key={service.id} style={styles.row}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Switch
                    style={styles.serviceSwitch}
                    onValueChange={(value) => {this.toggleService(service.id, value)}}
                    value={service.selected} />
                  {price}
                </View>
              )
            })}
          </View>
          <Button containerStyle={styles.button} text='Avançar' onPress={this._createServices.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.services
  };
}

export default connect(select)(ServicesForm);

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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  serviceName: {
    fontSize: 16,
    flex: .5
  },
  servicePrice: {
    flex: .3
  },
  serviceSwitch: {
    flex: .2
  }
});
