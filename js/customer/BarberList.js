import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
} from 'react-native';

import BarberListItem from './BarberListItem';

export default class BarberList extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    var barbers = [
      { id: 1, name: 'Nostalgics', street: 'Rua Nove de Julho', number: '34', district: 'Centro', image: require('../../img/nostalgics.png') },
      { id: 2, name: 'Moustache', street: 'Rua Siqueira Campos', number: '45', district: 'Centro', image: require('../../img/moustache.jpg') },
      { id: 3, name: 'Pulzatto', street: 'Rua Saudades', number: '15', district: 'Centro', image: require('../../img/pulzatto.jpg') },
      { id: 4, name: 'Marcelo Bueno', street: 'Rua Barão', number: '120', district: 'Centro', image: require('../../img/marcelo-bueno.jpg') },
    ];

    this.state = {
      dataSource: ds.cloneWithRows(barbers),
    };
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<BarberListItem navigator={this.props.navigator} barber={rowData} />);
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
