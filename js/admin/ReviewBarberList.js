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
  StatusBar,
  Platform
} from 'react-native';

import { connect } from 'react-redux';

import Toolbar from '../common/Toolbar';
import ReviewBarberListItem from './ReviewBarberListItem';
import { listBarbers, refreshBarbers } from '../actions/admin';
import EmptyResults from '../common/EmptyResults';

class ReviewBarberList extends Component {
  componentDidMount() {
    this._fetchData('load');
  }

  _renderRow(rowData, sectionID, rowID) {
    return(<ReviewBarberListItem key={rowID} navigator={this.props.navigator} barber={rowData} />);
  }

  _onRefresh() {
    this._fetchData('refresh');
  }

  _fetchData(action) {
    var {meta} = this.props;
    var data = action === 'refresh' ? {page: 1} : {page: meta.next_page};
    var fn = action === 'load' ? listBarbers : refreshBarbers;
    this.props.dispatch(fn(data));
  }

  _getLoadingContent() {
    if (this.props.isLoading) {
      return <View style={styles.loading}><ActivityIndicator /></View>;
    } else {
      return <View />;
    }
  }

  _onEndReached() {
    if (!this.props.isLoading && this.props.meta.next_page) {
      this._fetchData('load');
    }
  }

  render() {
    var refreshControl = <RefreshControl refreshing={this.props.isRefreshing || false} onRefresh={this._onRefresh.bind(this)} />
    var content;

    if (!this.props.isLoading && this.props.dataSource.getRowCount() === 0) {
      var message = 'Não existem barbearias cadastradas.';
      content = <ScrollView refreshControl={refreshControl}><EmptyResults icon='shop' message={message} /></ScrollView>;
    } else {
      content =
        <ListView
          dataSource={this.props.dataSource}
          renderRow={this._renderRow.bind(this)}
          refreshControl={refreshControl}
          automaticallyAdjustContentInsets={false}
          renderFooter={this._getLoadingContent.bind(this)}
          enableEmptySections={true}
          onEndReached={this._onEndReached.bind(this)}
          initialListSize={1}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}/>;
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={this.props.isLoading || this.props.isRefreshing} />
        <Toolbar backIcon border navigator={this.props.navigator} title='Revisar barbearias' />
        <View style={styles.listContainer}>{content}</View>
      </View>
    );
  }
}

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

function select(store) {
  return {
    dataSource: dataSource.cloneWithRows(store.admin.barbers),
    isLoading: store.admin.isLoading,
    isRefreshing: store.admin.isRefreshing,
    meta: store.admin.meta
  };
}

export default connect(select)(ReviewBarberList);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 60 : 0
  },
  listContainer: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    padding: 10
  },
  loading: {
    marginBottom: 10
  }
});
