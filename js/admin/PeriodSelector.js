import React, {Component,PropTypes} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  DatePickerAndroid,
  Modal,
  DatePickerIOS
} from 'react-native'
import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';

import formStyle from '../forms/style';
import Button from '../common/Button';
import { changePeriod } from '../actions/barbersChart';

class PeriodSelector extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    date.setMinutes(0);

    this.state = {
      modalVisible: false,
      date: date,
      name: null
    };
  }

  updateDate(name, date) {
    this.props.dispatch(changePeriod(name, date));
  }

  showPicker(name) {
    dismissKeyboard();

    if (Platform.OS === 'ios') {
      this.showIOSPicker(name);
    } else {
      this.showAndroidPicker(name);
    }
  }

  showIOSPicker(name) {
    this.setState({modalVisible: true, name});
  }

  async showAndroidPicker(name) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({date: this.state.date});
      if (action !== DatePickerAndroid.dismissedAction) {
        this.updateDate(name, this._formatDate(year, month + 1, day));
      }
    } catch ({code, message}) {
    }
  }

  _formatDate(year, month, day) {
    return `${day}/${month}/${year}`;
  }

  selectDate() {
    var {name, date} = this.state;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    this.updateDate(name, this._formatDate(year, month, day));
    this.setState({modalVisible: false, name: null});
  }

  render () {
    const {period} = this.props;

    var modalContent;
    if (Platform.OS === 'ios') {
      modalContent = (
        <Modal
          transparent={false}
          visible={this.state.modalVisible}
          animationType='slide'>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Selecione o dia:</Text>
            <DatePickerIOS
              mode='date'
              date={this.state.date}
              onDateChange={(date) => this.setState({date: date})}/>
            <Button
              text='OK'
              containerStyle={styles.button}
              onPress={this.selectDate.bind(this)} />
          </View>
        </Modal>
      );
    }

    return (
      <View style={styles.periodInput}>
        {modalContent}
        <TextInput
          style={[formStyle.textbox.normal, styles.periodInput]}
          onFocus={() => {this.showPicker('fromDate')}}
          value={period.fromDate}
          placeholder='a partir do dia' />
        <View style={styles.periodSeparator} />
        <TextInput
          style={[formStyle.textbox.normal, styles.periodInput]}
          onFocus={() => {this.showPicker('toDate')}}
          value={period.toDate}
          placeholder='até o dia' />
      </View>
    )
  }
}

export default PeriodSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 70 : 0,
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  innerContainer: {
    padding: 20,
    marginTop: 20
  },
  periodInput: {
    alignSelf: 'stretch',
  },
})
