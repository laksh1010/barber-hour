import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  Switch,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import BarberIcon from '../common/BarberIcon';
import AppointmentCanceled from './AppointmentCanceled';

export default class HaircutDetails extends Component {
  _cancelSchedule() {
    this.props.navigator.replace({
      component: AppointmentCanceled
    });
  }

  _confirmCancelSchedule() {
    Alert.alert(
      'Cancelar horário',
      'Tem certeza que deseja cancelar esse horário?',
      [
        {text: 'Cancelar horário', onPress: () => {this._cancelSchedule()} },
        {text: 'Voltar', style: 'cancel'},
      ]
    );
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
    const { appointment, navigator } = this.props;
    const { schedule, barber, appointment_services } = appointment;

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon border navigator={navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{barber.name}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{schedule.day_number} de {schedule.month_name} às {schedule.hour}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.statusContainer}>
            <Icon name={this._iconForStatus(appointment.status)} size={24} color='#003459' style={styles.icon} />
            <Text>{appointment.translated_status}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.innerContainer}>
          {appointment_services.map((appointmentService) => {
            const icon = appointmentService.service_name === 'Corte de Cabelo' ? 'scissor-4' : 'razor';
            return(
              <View key={appointmentService.id} style={styles.serviceContainer}>
                <BarberIcon name={icon} size={24} color='#003459' style={styles.serviceIcon} />
                <Text style={styles.price}>{appointmentService.service_name}: {appointmentService.service_price}</Text>
              </View>
            )
          })}
        </View>
        {appointment.status === 'scheduled' ? (
          <View>
            <View style={styles.separator} />
            <View style={styles.innerContainer}>
                <Button containerStyle={styles.button} text='Cancelar' onPress={this._confirmCancelSchedule.bind(this)} />
            </View>
          </View>
        ) : (<View />)}
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#111111'
  },
  info: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  separator: {
    backgroundColor: '#DCDCDC',
    height: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  serviceIcon: {
    marginRight: 20
  },
  icon: {
    marginRight: 10
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center'
  }
});
