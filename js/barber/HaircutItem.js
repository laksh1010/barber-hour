import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import HaircutDetails from './HaircutDetails';
import Touchable from '../common/Touchable';

export default class HaircutItem extends Component {
  _openDetails() {
    this.props.navigator.push({
      component: HaircutDetails,
      passProps: {appointment: this.props.appointment}
    });
  }

  _iconForStatus(status) {
    switch (status) {
      case 'finished':
        return 'alarm-on';
      case 'canceled':
        return 'alarm-off';
      case 'scheduled':
        return 'alarm';
    }
  }

  render() {
    const { appointment } = this.props;
    const { schedule, customer } = appointment;

    return(
      <Touchable style={styles.card} onPress={this._openDetails.bind(this)}>
        <View>
          <View>
            <Text style={styles.date} numberOfLines={1}>{schedule.day_number} de {schedule.month_name} às {schedule.hour}</Text>
            <Text style={styles.customer} numberOfLines={1}>{customer.name}</Text>
            <View style={styles.statusContainer}>
              <Icon name={this._iconForStatus(appointment.status)} size={24} color='#003459' style={styles.icon} />
              <Text>{appointment.translated_status}</Text>
            </View>
          </View>
        </View>
      </Touchable>
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
  date: {
    fontWeight: 'bold',
    color: '#292929',
    fontSize: 18
  },
  customer: {
    color: '#A2A2A2',
    fontSize: 18
  },
  icon: {
    marginRight: 5
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  }
});
