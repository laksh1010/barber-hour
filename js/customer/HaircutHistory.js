import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import HaircutHistoryItem from './HaircutHistoryItem';
import { listAppointments } from '../actions/appointments';
import EmptyResults from '../common/EmptyResults';

class HaircutHistory extends Component {
  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    this.props.dispatch(listAppointments('customer'));
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<HaircutHistoryItem key={rowID} navigator={this.props.navigator} appointment={rowData} />);
  }

  _onRefresh() {
    this._fetchData();
  }

  render() {
    var refreshControl = <RefreshControl refreshing={this.props.isLoading} onRefresh={this._onRefresh.bind(this)} />
    var content;

    if (this.props.isLoading) {
      content = <ActivityIndicator />;
    } else if (this.props.dataSource.getRowCount() === 0) {
      var message = 'Você ainda não agendou nenhum corte.';
      content = <ScrollView refreshControl={refreshControl}><EmptyResults icon='scissor-4' message={message} /></ScrollView>;
    } else {
      content =
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this._renderRow.bind(this)}
          refreshControl={refreshControl}
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
  return {
    dataSource: dataSource.cloneWithRows(store.appointments.appointments),
    isLoading: store.appointments.isLoading
  };
}

export default connect(select)(HaircutHistory);

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
