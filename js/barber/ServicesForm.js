import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Switch
} from 'react-native';

import Button from '../common/Button';
import ImageChooser from './ImageChooser';

export default class ServicesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [
        {id: 1, name: 'Corte de Cabelo', selected: false, price: null},
        {id: 2, name: 'Corte de Barba', selected: false, price: null}
      ]
    };
  }

  toggleService(serviceID, value) {
    var index = this.state.services.findIndex(service => service.id === serviceID);
    var service = this.state.services.find(service => service.id === serviceID);
    var newState = {
      services: [
        ...this.state.services.slice(0, index),
        Object.assign(service, { selected: value }),
        ...this.state.services.slice(index + 1)
      ]
    };
    this.setState(newState);
  }

  _openImageChooser() {
    this.props.navigator.resetTo({
      component: ImageChooser
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Serviços</Text>
          <Text style={styles.info}>Selecione os serviços que você realiza:</Text>
          <View style={styles.formContainer}>
            {this.state.services.map((service) => {
              var price = service.selected ? (
                <TextInput style={styles.servicePrice} placeholder='preço (R$)' keyboardType='numeric' />
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
          <Button containerStyle={styles.button} text='Avançar' onPress={this._openImageChooser.bind(this)} />
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
