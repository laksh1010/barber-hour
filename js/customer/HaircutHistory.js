import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
} from 'react-native';

import HaircutHistoryItem from './HaircutHistoryItem';

export default class HaircutHistory extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    var appointments = [
      { id: 1, barber: 'Nostalgics', startAt: '13h', endAt: '14h', day: '02/06/2016', status: 'open', translatedStatus: 'Agendado' },
      { id: 2, barber: 'Moustache', startAt: '13h', endAt: '14h', day: '10/05/2016', status: 'closed', translatedStatus: 'Finalizado' },
      { id: 3, barber: 'Nostalgics', startAt: '13h', endAt: '14h', day: '23/03/2016', status: 'canceled', translatedStatus: 'Cancelado' },
    ];

    this.state = {
      dataSource: ds.cloneWithRows(appointments),
    };
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<HaircutHistoryItem navigator={this.props.navigator} appointment={rowData} />);
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}/>
        </View>
      </View>
    );
  }
}

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
