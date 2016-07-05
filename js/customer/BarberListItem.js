import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import BarberDetails from './BarberDetails';
import BarberIcon from '../common/BarberIcon';

export default class BarberListItem extends Component {
  _openDetails() {
    this.props.navigator.push({
      title: this.props.barber.name,
      component: BarberDetails,
      passProps: { barberID: this.props.barber.id }
    });
  }

  render() {
    const { barber } = this.props;
    const {address, services, images} = barber;

    return (
      <TouchableNativeFeedback onPress={this._openDetails.bind(this)}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: images[0].url}}/>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{barber.name}</Text>
              <Text style={styles.address}>{`${address.street}, ${address.number} - ${address.district}`}</Text>
              {services.map(service => {
                const icon = service.name === 'Corte de Cabelo' ? 'scissor-4' : 'razor';
                return(
                  <View style={styles.serviceContainer}>
                    <BarberIcon name={icon} size={24} color='#003459' style={styles.icon} />
                    <Text style={styles.price}>{service.formatted_price}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

var styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
    elevation: 2,
    flex: 1
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 2
  },
  row: {
    flexDirection: 'row'
  },
  name: {
    fontWeight: 'bold',
    color: '#292929',
    fontSize: 18
  },
  address: {
    color: '#A2A2A2',
    fontSize: 14
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1
  },
  icon: {
    marginRight: 5
  },
  price: {
    color: '#03A9F4'
  },
  serviceContainer: {
    flexDirection: 'row',
    marginTop: 5
  }
});
