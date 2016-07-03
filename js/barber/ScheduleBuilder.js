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

import { connect } from 'react-redux';

import Button from '../common/Button';
import WaitReview from './WaitReview';
import formStyle from '../forms/style';

import {
  createScheduleTemplates,
  toggleScheduleTemplate,
  changeScheduleTemplateTime,
  addScheduleTemplateError,
  addError,
  setEditMode,
  changeServiceDuration
} from '../actions/scheduleTemplates';

class ScheduleBuilder extends Component {
  _createScheduleTemplates() {
    var active = this.props.form.scheduleTemplates.filter(scheduleTemplate => scheduleTemplate.active);

    if (active.length) {
      if (this._validate(active)) {
        var scheduleTemplates = active.map(scheduleTemplate => {
          return {
            weekday: scheduleTemplate.weekday,
            active: scheduleTemplate.active,
            opens_at: scheduleTemplate.opensAt.replace(':', '.'),
            closes_at: scheduleTemplate.closesAt.replace(':', '.')
          }
        });
        var serviceDuration = this.props.form.serviceDuration.replace(':', '.');
        var data = {
          schedule_templates_attributes: scheduleTemplates,
          service_duration: serviceDuration
        };
        this.props.dispatch(createScheduleTemplates(data));
      }
    } else {
      this.props.dispatch(addError());
    }
  }

  _validate(scheduleTemplates) {
    var valid = true;

    scheduleTemplates.filter(scheduleTemplate => {
      if (!scheduleTemplate.opensAt || parseFloat(scheduleTemplate.opensAt.replace(':', '.')) <= 0 || parseFloat(scheduleTemplate.opensAt.replace(':', '.')) > 24) {
        this.props.dispatch(addScheduleTemplateError(scheduleTemplate.weekday));
        valid = false;
      }

      if (!scheduleTemplate.closesAt || parseFloat(scheduleTemplate.closesAt.replace(':', '.')) <= 0 || parseFloat(scheduleTemplate.closesAt.replace(':', '.')) > 24) {
        this.props.dispatch(addScheduleTemplateError(scheduleTemplate.weekday));
        valid = false;
      }
    });

    return valid;
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.dispatch(setEditMode());
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      if (this.props.edit) {
        this.props.navigator.pop();
      } else {
        this.props.navigator.resetTo({
          component: WaitReview
        });
      }
    }
  }

  toggleScheduleTemplate(weekday, value) {
    this.props.dispatch(toggleScheduleTemplate(weekday, value));
  }

  updateTime(weekday, field, time) {
    this.props.dispatch(changeScheduleTemplateTime(weekday, field, time));
  }

  changeServiceDuration(serviceDuration) {
    this.props.dispatch(changeServiceDuration(serviceDuration));
  }

  async showPicker(weekday, field) {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open({is24Hour: true});
      if (action === TimePickerAndroid.timeSetAction) {
        this.updateTime(weekday, field, this._formatTime(hour, minute));
      }
    } catch ({code, message}) {
    }
  }

  _formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
  }

  render() {
    var errorMessage;

    if (this.props.form.error) {
      errorMessage = <Text style={formStyle.errorBlock}>Por favor, selecione pelo menos um dia.</Text>;
    }

    var buttonLabel = this.props.edit ? 'Alterar' : 'Avançar';

    return(
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor='#C5C5C5'/>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Agenda semanal</Text>
            <Text style={styles.info}>Selecione os dias e horários que você trabalha:</Text>
            <View style={styles.formContainer}>
              {this.props.form.scheduleTemplates.map((scheduleTemplate) => {
                var errorBlock = scheduleTemplate.error ? (
                  <Text style={formStyle.errorBlock}>{scheduleTemplate.error}</Text>
                ) : <View />;

              var time = scheduleTemplate.active ? (
                  <View style={styles.time}>
                    <TextInput
                      style={formStyle.textbox.normal}
                      placeholder='abre às'
                      keyboardType='numeric'
                      value={scheduleTemplate.opensAt}
                      onFocus={() => {this.showPicker(scheduleTemplate.weekday, 'opensAt')}} />
                    <TextInput
                      style={formStyle.textbox.normal}
                      placeholder='fecha às'
                      keyboardType='numeric'
                      value={scheduleTemplate.closesAt}
                      onFocus={() => {this.showPicker(scheduleTemplate.weekday, 'closesAt')}} />
                    {errorBlock}
                  </View>
                ) : <View />;

                return(
                  <View key={scheduleTemplate.weekday} style={styles.row}>
                    <Text style={styles.name}>{scheduleTemplate.name}</Text>
                    <Switch
                      style={styles.toggle}
                      onValueChange={(value) => {this.toggleScheduleTemplate(scheduleTemplate.weekday, value)}}
                      value={scheduleTemplate.active} />
                    {time}
                  </View>
                )
              })}
              <View style={styles.row}>
                <Text style={styles.info}>Duração média de serviço:</Text>
                <TextInput
                  style={[formStyle.textbox.normal, styles.serviceDurationInput]}
                  placeholder='horas:minutos'
                  onChangeText={(text) => {this.changeServiceDuration(text)}}
                  value={this.props.form.serviceDuration}
                  keyboardType='numeric'/>
              </View>
            </View>
            <Text style={formStyle.helpBlock.normal}>Use o formato: horas:minutos</Text>
            <Text style={formStyle.helpBlock.normal}>Deixe em branco para o usar o padrão, que é de 1h.</Text>
            {errorMessage}
            <Button containerStyle={styles.button} text={buttonLabel} onPress={this._createScheduleTemplates.bind(this)} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.scheduleTemplates
  };
}

export default connect(select)(ScheduleBuilder);

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
  name: {
    fontSize: 16,
    flex: .5
  },
  time: {
    flex: .3
  },
  toggle: {
    flex: .2
  },
  serviceDurationInput: {
    flex: .2
  }
});
