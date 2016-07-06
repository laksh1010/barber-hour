import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import BarberListItem from './BarberListItem';
import { listBarbers } from '../actions/barbers';

class BarberList extends Component {
  componentDidMount() {
    if (this.props.dataSource.getRowCount() === 0) {
      this.props.dispatch(listBarbers());
    }
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<BarberListItem key={rowID} navigator={this.props.navigator} barber={rowData} />);
  }

  render() {
    var content;

    if (this.props.isLoading || this.props.dataSource.length === 0) {
      content = <ActivityIndicator />;
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
  return {
    dataSource: dataSource.cloneWithRows(store.barbers.barbers),
    isLoading: store.barbers.isLoading
  };
}

export default connect(select)(BarberList);

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
