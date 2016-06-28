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

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import SelectableButton from '../common/SelectableButton';
import BarberIcon from '../common/BarberIcon';
import AppointmentScheduled from './AppointmentScheduled';

export default class BarberDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [
        {
          number: '02',
          monthName: 'Jun',
          name: 'Hoje',
          selected: true,
          schedules: [
            {id: 1, startAt: '13h', endAt: '14h', disabled: true},
            {id: 2, startAt: '14h', endAt: '15h', disabled: true},
            {id: 3, startAt: '15h', endAt: '16h', disabled: false},
            {id: 4, startAt: '16h', endAt: '17h', disabled: false},
            {id: 5, startAt: '17h', endAt: '18h', disabled: false},
            {id: 6, startAt: '18h', endAt: '19h', disabled: false},
          ]
        },
        {
          number: '03',
          monthName: 'Jun',
          name: 'Sexta',
          selected: false,
          schedules: [
            {id: 7, startAt: '13h', endAt: '14h', disabled: false},
            {id: 8, startAt: '14h', endAt: '15h', disabled: false},
            {id: 9, startAt: '15h', endAt: '16h', disabled: true},
            {id: 10, startAt: '16h', endAt: '17h', disabled: true},
            {id: 11, startAt: '17h', endAt: '18h', disabled: false},
            {id: 12, startAt: '18h', endAt: '19h', disabled: false},
          ]
        }
      ],
      services: [
        {id: 1, name: 'Corte de Cabelo', selected: false, price: 'R$ 20,00'},
        {id: 2, name: 'Corte de Barba', selected: false, price: 'R$ 10,00'}
      ]
    };
  }

  _selectDay(index) {
    const days = this.state.days.map((d) => {
      d.selected = false
      return(d);
    });
    const day = this.state.days[index];
    const newState = {
      services: this.state.services,
      days: [
        ...days.slice(0, index),
        Object.assign(day, { selected: true }),
        ...days.slice(index + 1)
      ]
    };
    this.setState(newState);
  }

  _selectSchedule(schedule) {
    const selectedDay = this.state.days.find(day => day.selected);
    const index = this.state.days.findIndex(day => day.selected);
    const schedules = selectedDay.schedules.map((s) => {
      s.selected = (s.id === schedule.id);
      return(s);
    });
    const newState = {
      services: this.state.services,
      days: [
        ...this.state.days.slice(0, index),
        Object.assign(selectedDay, { schedules: schedules }),
        ...this.state.days.slice(index + 1)
      ]
    };
    this.setState(newState);
  }

  _toggleService(serviceID, value) {
    var index = this.state.services.findIndex(service => service.id === serviceID);
    var service = this.state.services.find(service => service.id === serviceID);
    var newState = {
      days: this.state.days,
      services: [
        ...this.state.services.slice(0, index),
        Object.assign(service, { selected: value }),
        ...this.state.services.slice(index + 1)
      ]
    };
    this.setState(newState);
  }

  _sendSchedule() {
    this.props.navigator.replace({
      component: AppointmentScheduled
    });
  }

  _confirmSchedule() {
    Alert.alert(
      'Agendar horário',
      'Tem certeza que deseja agendar esse horário?',
      [
        {text: 'Agendar horário', onPress: () => {this._sendSchedule()} },
        {text: 'Cancelar', style: 'cancel'},
      ]
    );
  }

  render() {
    const { barber, navigator } = this.props;
    const address = `${barber.street}, ${barber.number} - ${barber.district}`;
    const selectedDay = this.state.days.find(day => day.selected);

    return(
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor='#C5C5C5'/>
          <Toolbar backIcon border title={barber.name} navigator={navigator} />
          <Image source={barber.image} style={styles.image} />
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{barber.name}</Text>
            <View style={styles.infoContainer}>
              <BarberIcon name='location' size={24} color='#003459' style={styles.icon} />
              <Text style={styles.info}>{address}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            <Text style={styles.info}>Escolha a data:</Text>
            <View style={styles.selectableButtonContainer}>
              {this.state.days.map((day, i) => {
                return(
                  <SelectableButton key={i} title={day.name} text={day.number}
                    selected={day.selected} onPress={() => this._selectDay(i)} />
                )
              })}
            </View>
            <Text style={styles.info}>Escolha o horário:</Text>
            <View style={styles.selectableButtonContainer}>
              {selectedDay.schedules.map(schedule => {
                const title = `${schedule.startAt}-${schedule.endAt}`;
                return(
                  <SelectableButton key={schedule.id} title={title} disabled={schedule.disabled}
                    selected={schedule.selected} onPress={() => this._selectSchedule(schedule)} />
                )
              })}
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            <Text style={styles.info}>Escolha os serviços:</Text>
            {this.state.services.map((service) => {
              const icon = service.name === 'Corte de Cabelo' ? 'scissor-4' : 'razor';
              return(
                <View key={service.id} style={styles.serviceContainer}>
                  <BarberIcon name={icon} size={24} color='#003459' style={styles.icon} />
                  <Text style={styles.price}>{service.name}: {service.price}</Text>
                  <Switch
                    onValueChange={(value) => {this._toggleService(service.id, value)}}
                    value={service.selected} />
                </View>
              )
            })}
          </View>
          <View style={styles.separator} />
          <View style={styles.innerContainer}>
            <Button containerStyle={styles.button} text='Agendar' onPress={this._confirmSchedule.bind(this)} />
          </View>
        </ScrollView>
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
    justifyContent: 'center'
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
