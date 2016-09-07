import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Switch,
  TimePickerAndroid,
  ScrollView,
  ActivityIndicator,
  Platform,
  Modal,
  DatePickerIOS
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';

import Toolbar from '../common/Toolbar';
import Button from '../common/Button';
import WaitReview from './WaitReview';
import formStyle from '../forms/style';

import {
  createScheduleTemplates,
  toggleScheduleTemplate,
  changeScheduleTemplateTime,
  addError,
  getScheduleTemplates,
  changeAverageServiceTime
} from '../actions/scheduleTemplates';

class ScheduleBuilder extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    date.setMinutes(0);

    this.state = {
      modalVisible: false,
      date: date,
      weekday: null,
      field: null
    };
  }

  _createScheduleTemplates() {
    var active = this.props.form.scheduleTemplates.filter(scheduleTemplate => scheduleTemplate.active);

    if (active.length) {
      var scheduleTemplates = this.props.form.scheduleTemplates.map(scheduleTemplate => {
        return {
          id: scheduleTemplate.id,
          weekday: scheduleTemplate.weekday,
          active: scheduleTemplate.active,
          opens_at: scheduleTemplate.opensAt.value,
          closes_at: scheduleTemplate.closesAt.value,
          lunch_starts_at: scheduleTemplate.lunchStartsAt.value,
          lunch_ends_at: scheduleTemplate.lunchEndsAt.value
        }
      });
      var averageServiceTime = this.props.form.averageServiceTime.value;
      var data = {
        schedule_templates_attributes: scheduleTemplates,
        average_service_time: averageServiceTime
      };
      this.props.dispatch(createScheduleTemplates(data, this.props.edit));
    } else {
      this.props.dispatch(addError());
    }
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.dispatch(getScheduleTemplates());
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      if (this.props.edit) {
        this.props.navigator.pop();
      } else {
        const route = {
          component: WaitReview,
          title: 'Barber Hour'
        };

        Platform.OS === 'ios' ? this.props.navigator.replace(route) : this.props.navigator.resetTo(route);
      }
    }
  }

  toggleScheduleTemplate(weekday, value) {
    this.props.dispatch(toggleScheduleTemplate(weekday, value));
  }

  updateTime(weekday, field, time) {
    this.props.dispatch(changeScheduleTemplateTime(weekday, field, time));
  }

  changeAverageServiceTime(averageServiceTime) {
    this.props.dispatch(changeAverageServiceTime(averageServiceTime));
  }

  showPicker(weekday, field) {
    dismissKeyboard();

    if (Platform.OS === 'ios') {
      this.showIOSPicker(weekday, field);
    } else {
      this.showAndroidPicker(weekday, field);
    }
  }

  showIOSPicker(weekday, field) {
    this.setState({modalVisible: true, weekday: weekday, field: field});
  }

  selectTime() {
    var {weekday, field, date} = this.state;
    var [hour, minutes] = date.toTimeString().split(':');
    this.updateTime(weekday, field, `${hour}:${minutes}`);
    this.setState({modalVisible: false, weekday: null, field: null});
  }

  async showAndroidPicker(weekday, field) {
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

  _getButtonLabel() {
    if (this.props.edit) {
      return this.props.form.isLoading ? 'Alterando...' : 'Alterar';
    } else {
      return this.props.form.isLoading ? 'Cadastrando...' : 'Avançar';
    }
  }

  render() {
    var errorMessage;

    if (this.props.form.error) {
      errorMessage = <Text style={formStyle.errorBlock}>Por favor, selecione pelo menos um dia.</Text>;
    }

    var content;
    if (this.props.form.isRequestingInfo) {
      content = <ActivityIndicator size='small' />;
    }

    var toolbarContent;
    if (this.props.edit) {
      toolbarContent = <Toolbar backIcon navigator={this.props.navigator} />;
    }

    var modalContent;
    if (Platform.OS === 'ios') {
      modalContent = (
        <Modal
          transparent={false}
          visible={this.state.modalVisible}
          animationType='slide'>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Selecione o horário:</Text>
              <DatePickerIOS
                mode='time'
                date={this.state.date}
                onDateChange={(date) => this.setState({date: date})}
                minuteInterval={30}/>
              <Button
                text='OK'
                containerStyle={styles.button}
                onPress={this.selectTime.bind(this)} />
            </View>
          </View>
        </Modal>
      );
    }

    var isLoading = this.props.form.isLoading || this.props.form.isRequestingInfo;

    var marginTop = (!this.props.edit && Platform.OS === 'ios') ? 55 : 0;

    return(
      <View style={[styles.container, { marginTop }]}>
        <ScrollView>
          <StatusBar backgroundColor='#C5C5C5'/>
          {toolbarContent}
          {modalContent}
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Agenda semanal</Text>
            <Text style={styles.info}>Selecione os dias e horários que você trabalha:</Text>
            {content}
            <View style={styles.formContainer}>
              {this.props.form.scheduleTemplates.map((scheduleTemplate) => {
                var time = scheduleTemplate.active ? (
                  <View style={styles.time}>
                    <TextInput
                      style={formStyle.textbox.normal}
                      placeholder='abre às'
                      value={scheduleTemplate.opensAt.value}
                      editable={!isLoading}
                      onFocus={() => {this.showPicker(scheduleTemplate.weekday, 'opensAt')}} />
                    {scheduleTemplate.opensAt.error ? (
                        <Text style={formStyle.errorBlock}>{scheduleTemplate.opensAt.error}</Text>
                      ) : <View />}
                    <TextInput
                      style={formStyle.textbox.normal}
                      placeholder='almoço às'
                      value={scheduleTemplate.lunchStartsAt.value}
                      editable={!isLoading}
                      onFocus={() => {this.showPicker(scheduleTemplate.weekday, 'lunchStartsAt')}} />
                    {scheduleTemplate.lunchStartsAt.error ? (
                        <Text style={formStyle.errorBlock}>{scheduleTemplate.lunchStartsAt.error}</Text>
                      ) : <View />}
                    <TextInput
                      style={formStyle.textbox.normal}
                      placeholder='fim do almoço'
                      value={scheduleTemplate.lunchEndsAt.value}
                      editable={!isLoading}
                      onFocus={() => {this.showPicker(scheduleTemplate.weekday, 'lunchEndsAt')}} />
                    {scheduleTemplate.lunchEndsAt.error ? (
                        <Text style={formStyle.errorBlock}>{scheduleTemplate.lunchEndsAt.error}</Text>
                      ) : <View />}
                    <TextInput
                      style={formStyle.textbox.normal}
                      placeholder='fecha às'
                      value={scheduleTemplate.closesAt.value}
                      editable={!isLoading}
                      onFocus={() => {this.showPicker(scheduleTemplate.weekday, 'closesAt')}} />
                    {scheduleTemplate.closesAt.error ? (
                        <Text style={formStyle.errorBlock}>{scheduleTemplate.closesAt.error}</Text>
                      ) : <View />}
                  </View>
                ) : <View />;

                return(
                  <View key={scheduleTemplate.weekday} style={[styles.row, styles.item]}>
                    <Text style={styles.name}>{scheduleTemplate.name}</Text>
                    <Switch
                      style={styles.toggle}
                      onValueChange={(value) => {this.toggleScheduleTemplate(scheduleTemplate.weekday, value)}}
                      disabled={isLoading}
                      onTintColor='#004575'
                      value={scheduleTemplate.active} />
                    {time}
                  </View>
                )
              })}
              <View style={styles.row}>
                <Text style={styles.info}>Duração média de serviço:</Text>
                <TextInput
                  style={[formStyle.textbox.normal, styles.averageServiceTimeInput]}
                  placeholder='horas:minutos'
                  onChangeText={(text) => {this.changeAverageServiceTime(text)}}
                  value={this.props.form.averageServiceTime.value}
                  editable={!isLoading} />
              </View>
            </View>
            {this.props.form.averageServiceTime.error ? (
                <Text style={[formStyle.errorBlock, {textAlign: 'right'}]}>{this.props.form.averageServiceTime.error}</Text>
              ) : <View />}
            <Text style={formStyle.helpBlock.normal}>Use o formato: horas:minutos</Text>
            {errorMessage}
            <Button
              containerStyle={styles.button}
              text={this._getButtonLabel()}
              disabled={isLoading}
              onPress={this._createScheduleTemplates.bind(this)} />
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
    backgroundColor: 'white'
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
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    flex: .4,
  },
  time: {
    flex: .4,
  },
  toggle: {
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
    marginRight: Platform.OS === 'ios' ? 5 : 0
  },
  averageServiceTimeInput: {
    flex: .2,
    marginLeft: 5
  },
  item: {
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    marginBottom: 5
  }
});
