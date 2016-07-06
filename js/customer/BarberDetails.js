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
  Alert,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import SelectableButton from '../common/SelectableButton';
import BarberIcon from '../common/BarberIcon';
import AppointmentScheduled from './AppointmentScheduled';
import formStyle from '../forms/style';

import { listSchedules, selectDay, selectSchedule } from '../actions/schedules';
import { toggleService } from '../actions/barbers';
import { addError, createAppointment } from '../actions/appointment';

class BarberDetails extends Component {
  _selectDay(index) {
    this.props.dispatch(selectDay(index));
  }

  _selectSchedule(schedule) {
    this.props.dispatch(selectSchedule(schedule));
  }

  _toggleService(serviceID, value) {
    this.props.dispatch(toggleService(this.props.barberID, serviceID, value));
  }

  _createAppointment(services, schedule) {
    var data = {
      id: schedule.id,
      serviceIds: services.map(service => service.id)
    };

    this.props.dispatch(createAppointment(data));
  }

  _confirmSchedule() {
    const {barberID} = this.props;
    const barber = this.props.barbers.barbers.find(barber => barber.id === barberID);
    const {days} = this.props.schedules;
    const selectedDay = days.find(day => day.selected);
    const selectedServices = barber.services.filter(service => service.selected);
    const selectedSchedule = selectedDay.schedules.find(schedule => schedule.selected);

    if (selectedServices.length && selectedSchedule) {
      Alert.alert(
        'Agendar horário',
        'Tem certeza que deseja agendar esse horário?',
        [
          {text: 'Agendar horário', onPress: () => {this._createAppointment(selectedServices, selectedSchedule)} },
          {text: 'Cancelar', style: 'cancel'},
        ]
      );
    } else {
      this.props.dispatch(addError());
    }
  }

  componentDidMount() {
    this.props.dispatch(listSchedules({id: this.props.barberID}));
  }

  componentDidUpdate() {
    if (this.props.appointment.success) {
      this.props.navigator.replace({
        component: AppointmentScheduled
      });
    }
  }

  render() {
    const {barberID, navigator} = this.props;
    const barber = this.props.barbers.barbers.find(barber => barber.id === barberID);
    const {address, images, services} = barber;
    const {days, isLoading} = this.props.schedules;
    const selectedDay = days.find(day => day.selected);

    var content;

    if (isLoading || days.length === 0) {
      content = <ActivityIndicator />;
    } else {
      content = (
        <View style={styles.innerContainer}>
          <Text style={styles.info}>Escolha a data:</Text>
          <View style={styles.selectableButtonContainer}>
            {days.map((day, index) => {
              return(
                <SelectableButton key={index} title={day.schedules[0].day_name}
                  text={`${day.number} ${day.schedules[0].month_name}`}
                  selected={day === selectedDay} onPress={() => this._selectDay(index)} />
              )
            })}
          </View>
          <Text style={styles.info}>Escolha o horário:</Text>
          <View style={styles.selectableButtonContainer}>
            {selectedDay.schedules.map(schedule => {
              return(
                <SelectableButton key={schedule.id} title={schedule.hour} disabled={schedule.disabled}
                  selected={schedule.selected} onPress={() => this._selectSchedule(schedule)} />
              )
            })}
          </View>
        </View>
      );
    }

    var errorMessage;

    if (this.props.appointment.error) {
      errorMessage = <Text style={formStyle.errorBlock}>{this.props.appointment.error}</Text>;
    }

    return(
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor='#C5C5C5'/>
          <Toolbar backIcon border title={barber.name} navigator={navigator} />
          <Image source={{uri: images[0].url}} style={styles.image} />
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{barber.name}</Text>
            <View style={styles.infoContainer}>
              <BarberIcon name='location' size={24} color='#003459' style={styles.icon} />
              <Text style={styles.info}>{`${address.street}, ${address.number} - ${address.district}`}</Text>
            </View>
          </View>
          <View style={styles.separator} />
            {content}
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            <Text style={styles.info}>Escolha os serviços:</Text>
            {services.map((service) => {
              const icon = service.name === 'Corte de Cabelo' ? 'scissor-4' : 'razor';
              return(
                <View key={service.id} style={styles.serviceContainer}>
                  <BarberIcon name={icon} size={24} color='#003459' style={styles.icon} />
                  <Text style={styles.price}>{service.name}: {service.formatted_price}</Text>
                  <Switch
                    onValueChange={(value) => {this._toggleService(service.id, value)}}
                    value={service.selected} />
                </View>
              )
            })}
          </View>
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            {errorMessage}
            <Button containerStyle={styles.button} text='Agendar' onPress={this._confirmSchedule.bind(this)} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function select(store) {
  return {
    schedules: store.schedules,
    barbers: store.barbers,
    appointment: store.appointment
  };
}

export default connect(select)(BarberDetails);

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
    textAlign: 'center',
    flex: 1
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: null,
    height: 200,
    flex: 1,
    resizeMode: 'cover'
  },
  separator: {
    backgroundColor: '#DCDCDC',
    height: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  icon: {
    marginRight: 5
  },
  selectableButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
