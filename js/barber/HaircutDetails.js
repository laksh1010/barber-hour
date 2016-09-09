import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import BarberIcon from '../common/BarberIcon';
import AppointmentCanceled from './AppointmentCanceled';
import formStyle from '../forms/style';

import { cancelAppointment, finishAppointment, listAppointments } from '../actions/appointments';

class HaircutDetails extends Component {
  componentDidMount() {
    if (!this.props.appointment) {
      this.props.dispatch(listAppointments('barber'));
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      this.props.navigator.replace({
        component: AppointmentCanceled
      });
    }
  }

  _cancelSchedule() {
    this.props.dispatch(cancelAppointment('barber', this.props.appointment.id));
  }

  _finishSchedule() {
    this.props.dispatch(finishAppointment(this.props.appointment.id));
  }

  _confirmCancelSchedule() {
    Alert.alert(
      'Cancelar horário',
      'Tem certeza que deseja cancelar esse horário?',
      [
        {text: 'Sim, cancelar horário', onPress: () => {this._cancelSchedule()} },
        {text: 'Voltar', style: 'cancel'},
      ]
    );
  }

  _confirmFinishSchedule() {
    Alert.alert(
      'Concluir horário',
      'Tem certeza que deseja concluir esse horário?',
      [
        {text: 'Sim, concluir horário', onPress: () => {this._finishSchedule()} },
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
    var { appointment, appointmentId, navigator } = this.props;
    appointment = appointment || this.props.form.appointments.find(a => a.id === appointmentId);

    var content;

    if (!appointment) {
      content = <View style={styles.innerContainer}><ActivityIndicator /></View>;
    } else {
      const { schedule, customer, appointment_services } = appointment;
      const cancelButtonLabel = this.props.form.isLoading ? 'Cancelando...' : 'Cancelar';
      const finishButtonLabel = this.props.form.isFinishing ? 'Concluindo...' : 'Concluir';
      var errorMessage;
      if (this.props.form.error) {
        errorMessage = <Text style={formStyle.errorBlock}>{this.props.form.error}</Text>;
      }

      content = (
        <View>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{customer.name}</Text>
            <View style={styles.infoContainer}>
              <Icon name='local-phone' size={24} color='#003459' style={styles.icon} />
              <Text style={styles.info}>{customer.phone}</Text>
            </View>
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
                {errorMessage}
                <Button
                  containerStyle={styles.button}
                  disabled={this.props.form.isLoading || this.props.form.isFinishing}
                  text={finishButtonLabel}
                  onPress={this._confirmFinishSchedule.bind(this)} />
                <Button
                  outline
                  containerStyle={styles.button}
                  disabled={this.props.form.isLoading || this.props.form.isFinishing}
                  text={cancelButtonLabel}
                  onPress={this._confirmCancelSchedule.bind(this)} />
              </View>
            </View>
          ) : (<View />)}
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon border navigator={navigator} />
        {content}
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.appointments
  };
}

export default connect(select)(HaircutDetails);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 60 : 0
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
