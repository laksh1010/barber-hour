import React, {Component,PropTypes} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Switch,
} from 'react-native'

import { connect } from 'react-redux';

import { toggleStatus } from '../actions/barbersChart';

class StatusSelector extends Component {
  toggleStatus(name, value) {
    this.props.dispatch(toggleStatus(name, value));
  }

  renderStatusInput(status, index) {
    return(
      <View style={styles.row} key={index}>
        <Text style={styles.toggleLabel}>{status.translated_name}</Text>
        <Switch
          onTintColor='#004575'
          onValueChange={(value) => {this.toggleStatus(status.name, value)}}
          value={status.selected}
          style={styles.toggle} />
      </View>
    );
  }

  render () {
    const {statuses} = this.props;

    return (
      <View style={styles.container}>
        {statuses.map(this.renderStatusInput.bind(this))}
      </View>
    );
  }
}

export default StatusSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggle: {
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
  },
  toggleLabel: {
    marginRight: 10
  },
})
