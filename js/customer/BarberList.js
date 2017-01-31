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
import { listBarbers, updateBarbersCache, refreshBarbers } from '../actions/barbers';
import EmptyResults from '../common/EmptyResults';

class BarberList extends Component {
  componentDidMount() {
    if (!this.props.isLoading && this.props.dataSource.getRowCount() === 0) {
      this._fetchData('load');
    } else {
      this._fetchData('updateCache');
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.city && this.props.city) {
      this._fetchData('updateCache');
    } else if (this.props.city && this.props.city.id !== prevProps.city.id) {
      this._fetchData('load');
    }
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<BarberListItem key={rowID} navigator={this.props.navigator} barber={rowData} />);
  }

  _onRefresh() {
    this._fetchData('refresh');
  }

  _fetchData(action) {
    var {city, meta} = this.props;
    var page = action === 'load' ? meta.next_page : 1;
    var data = {city_id: city.id, page: page};

    switch (action) {
      case 'load':
        return this.props.dispatch(listBarbers(data));
      case 'updateCache':
        return this.props.dispatch(updateBarbersCache(data));
      case 'refresh':
        return this.props.dispatch(refreshBarbers(data));
    }
  }

  _openFindCityFromGPS() {
    this.props.navigator.push({
      component: FindCityFromGPS,
      title: 'Escolher cidade',
      passProps: { edit: true }
    });
  }

  _getLoadingContent() {
    if (this.props.isLoading) {
      return <View style={styles.loading}><ActivityIndicator /></View>;
    } else {
      return <View />;
    }
  }

  _onEndReached() {
    if (!this.props.isLoading && this.props.meta && this.props.meta.next_page) {
      this._fetchData('load');
    }
  }

  render() {
    var refreshControl = <RefreshControl refreshing={this.props.isRefreshing || false} onRefresh={this._onRefresh.bind(this)} />
    var content;

    if (!this.props.isLoading && this.props.dataSource.getRowCount() === 0) {
      var message = 'Ainda não temos barbearias cadastradas em sua cidade.';
      content = <ScrollView refreshControl={refreshControl}><EmptyResults icon='shop' message={message} /></ScrollView>;
    } else {
      content =
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this._renderRow.bind(this)}
          refreshControl={refreshControl}
          renderFooter={this._getLoadingContent.bind(this)}
          enableEmptySections={true}
          onEndReached={this._onEndReached.bind(this)}
          initialListSize={1}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}/>;
    }

    return(
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <BarberIcon name='location' size={24} color='#003459' style={styles.icon} />
          {this.props.city && <Text style={styles.info}>{this.props.city.name} - {this.props.city.state.initials}</Text>}
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
    isRefreshing: store.barbers.isRefreshing,
    city: store.user.city,
    meta: store.barbers.meta
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
  loading: {
    marginBottom: 10
  }
});
