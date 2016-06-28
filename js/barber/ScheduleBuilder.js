import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Switch,
  TimePickerAndroid,
  ScrollView
} from 'react-native';

import Button from '../common/Button';
import WaitReview from './WaitReview';

export default class ScheduleBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [
        {id: 1, name: 'Segunda', selected: false, opensAt: null, closesAt: null},
        {id: 2, name: 'Terça', selected: false, opensAt: null, closesAt: null},
        {id: 3, name: 'Quarta', selected: false, opensAt: null, closesAt: null},
        {id: 5, name: 'Quinta', selected: false, opensAt: null, closesAt: null},
        {id: 6, name: 'Sexta', selected: false, opensAt: null, closesAt: null},
        {id: 7, name: 'Sábado', selected: false, opensAt: null, closesAt: null},
        {id: 8, name: 'Domingo', selected: false, opensAt: null, closesAt: null}
      ]
    };
  }

  toggleDay(dayID, value) {
    var index = this.state.days.findIndex(day => day.id === dayID);
    var day = this.state.days.find(day => day.id === dayID);
    var newState = {
      days: [
        ...this.state.days.slice(0, index),
        Object.assign(day, { selected: value }),
        ...this.state.days.slice(index + 1)
      ]
    };
    this.setState(newState);
  }

  _openWaitReview() {
    this.props.navigator.resetTo({
      component: WaitReview
    });
  }

  async showPicker(dayID, field) {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open({is24Hour: true});
      if (action === TimePickerAndroid.timeSetAction) {
        this._updateTime(dayID, field, this._formatTime(hour, minute));
      } else if (action === TimePickerAndroid.dismissedAction) {
        console.log('dismissed');
      }
    } catch ({code, message}) {
      console.warn(`Error in showPicker`, message);
    }
  }

  _formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
  }

  _updateTime(dayID, field, time) {
    var index = this.state.days.findIndex(day => day.id === dayID);
    var day = this.state.days.find(day => day.id === dayID);
    day[field] = time;
    var newState = {
      days: [
        ...this.state.days.slice(0, index),
        day,
        ...this.state.days.slice(index + 1)
      ]
    };
    this.setState(newState);
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor='#C5C5C5'/>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Agenda semanal</Text>
            <Text style={styles.info}>Selecione os dias e horários que você trabalha:</Text>
            <View style={styles.formContainer}>
              {this.state.days.map((day) => {
                var time = day.selected ? (
                  <View style={styles.dayTime}>
                    <TextInput placeholder='abre às' keyboardType='numeric' value={day.opensAt} onFocus={() => {this.showPicker(day.id, 'opensAt')}} />
                    <TextInput placeholder='fecha às' keyboardType='numeric' value={day.closesAt} onFocus={() => {this.showPicker(day.id, 'closesAt')}} />
                  </View>
                ) : <View />;

                return(
                  <View key={day.id} style={styles.row}>
                    <Text style={styles.dayName}>{day.name}</Text>
                    <Switch
                      style={styles.daySwitch}
                      onValueChange={(value) => {this.toggleDay(day.id, value)}}
                      value={day.selected} />
                    {time}
                  </View>
                )
              })}
              <View style={styles.row}>
                <Text style={styles.info}>Duração média de serviço:</Text>
                <TextInput style={styles.serviceDurationInput} placeholder='horas' keyboardType='numeric'/>
                <TextInput style={styles.serviceDurationInput} placeholder='minutos' keyboardType='numeric'/>
              </View>
            </View>
            <Button containerStyle={styles.button} text='Avançar' onPress={this._openWaitReview.bind(this)} />
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
  dayName: {
    fontSize: 16,
    flex: .5
  },
  dayTime: {
    flex: .3
  },
  daySwitch: {
    flex: .2
  },
  serviceDurationInput: {
    flex: .2
  }
});
