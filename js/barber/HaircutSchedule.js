import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
} from 'react-native';

import HaircutItem from './HaircutItem';

export default class HaircutSchedule extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    var appointments = [
      { id: 1, customer: 'Leonardo Tegon', startAt: '13h', endAt: '14h', day: '02/06/2016', status: 'open', translatedStatus: 'Agendado' },
      { id: 2, customer: 'Diego Sobreira', startAt: '13h', endAt: '14h', day: '10/05/2016', status: 'open', translatedStatus: 'Agendado' },
      { id: 3, customer: 'Barry Allen', startAt: '13h', endAt: '14h', day: '23/03/2016', status: 'open', translatedStatus: 'Agendado' },
    ];

    this.state = {
      dataSource: ds.cloneWithRows(appointments),
    };
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<HaircutItem navigator={this.props.navigator} appointment={rowData} />);
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
