import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import HaircutItem from './HaircutItem';
import { listAppointments } from '../actions/appointments';

class HaircutSchedule extends Component {
  componentDidMount() {
    if (this.props.dataSource.getRowCount() === 0) {
      this.props.dispatch(listAppointments('barber'));
    }
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<HaircutItem key={rowID} navigator={this.props.navigator} appointment={rowData} />);
  }

  render() {
    var content;

    if (this.props.isLoading) {
      content = <ActivityIndicator />;
    } else if (this.props.dataSource.length === 0) {
      content = <Text>Você não possui nenhum corte.</Text>;
    } else {
      content =
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}/>;
    }

    return(
      <View style={styles.container}>
        <View style={styles.listContainer}>{content}</View>
      </View>
    );
  }
}

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

function select(store) {
  var scheduledAppointments = store.appointments.appointments.filter(appointment => appointment.status === 'scheduled');

  return {
    dataSource: dataSource.cloneWithRows(scheduledAppointments),
    isLoading: store.appointments.isLoading
  };
}

export default connect(select)(HaircutSchedule);

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
});
