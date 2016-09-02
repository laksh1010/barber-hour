import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RecyclerViewBackedScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import BarberListItem from './BarberListItem';
import BarberIcon from '../common/BarberIcon';
import FindCityFromGPS from './FindCityFromGPS';
import { listBarbers } from '../actions/barbers';

class BarberList extends Component {
  componentDidMount() {
    if (this.props.dataSource.getRowCount() === 0) {
      var {city} = this.props;
      this.props.dispatch(listBarbers({city_id: city.id}));
    }
  }

  componentDidUpdate(prevProps) {
    var {city} = this.props;
    if (city.id !== prevProps.city.id) {
      this.props.dispatch(listBarbers({city_id: city.id}));
    }
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<BarberListItem key={rowID} navigator={this.props.navigator} barber={rowData} />);
  }

  _onRefresh() {
    var {city} = this.props;
    this.props.dispatch(listBarbers({city_id: city.id}));
  }

  _openFindCityFromGPS() {
    this.props.navigator.push({
      component: FindCityFromGPS,
      title: 'Escolher cidade',
      passProps: { edit: true }
    });
  }

  render() {
    var refreshControl = <RefreshControl refreshing={this.props.isLoading || false} onRefresh={this._onRefresh.bind(this)} />
    var content;

    if (this.props.isLoading) {
      content = <ActivityIndicator />;
    } else if (this.props.dataSource.getRowCount() === 0) {
      content = <ScrollView refreshControl={refreshControl}><Text>Não existem barbearias cadastradas.</Text></ScrollView>;
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
        <View style={styles.infoContainer}>
          <BarberIcon name='location' size={24} color='#003459' style={styles.icon} />
          <Text style={styles.info}>{this.props.city.name} - {this.props.city.state.initials}</Text>
          <TouchableOpacity onPress={this._openFindCityFromGPS.bind(this)}>
            <Text style={styles.link}>Alterar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>{content}</View>
      </View>
    );
  }
}

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

function select(store) {
  return {
    dataSource: dataSource.cloneWithRows(store.barbers.barbers),
    isLoading: store.barbers.isLoading,
    city: store.user.city
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#F8F8F8',
  },
  icon: {
    marginRight: 5,
    marginLeft: 20
  },
  info: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20
  },
});
