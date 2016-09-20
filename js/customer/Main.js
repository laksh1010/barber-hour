import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform
} from 'react-native';

import { connect } from 'react-redux';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Toolbar from '../common/Toolbar';
import IconTabBar from '../common/IconTabBar';
import BarberList from './BarberList';
import HaircutHistory from './HaircutHistory';
import Profile from './Profile';
import PushNotifications from '../PushNotifications';

class Main extends Component {
  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={this.props.networkActivityIndicatorVisible} />
        <Toolbar border navigator={this.props.navigator} />
        <ScrollableTabView
          scrollWithoutAnimation={true}
          locked={true}
          tabBarPosition='bottom'
          renderTabBar={() => <IconTabBar titles={['Barbearias', 'Cortes', 'Conta']} />}>
          <View tabLabel='pole' style={[styles.tabView, styles.tabViewWithoutPadding]}>
            <BarberList navigator={this.props.navigator} />
          </View>
          <View tabLabel='scissor-2' style={[styles.tabView, styles.tabViewWithoutPadding]}>
            <HaircutHistory navigator={this.props.navigator} />
          </View>
          <ScrollView tabLabel='profile-2' style={styles.tabView}>
            <Profile navigator={this.props.navigator} />
          </ScrollView>
        </ScrollableTabView>
        <PushNotifications />
      </View>
    );
  }
}

function select(store) {
  var barbersLoading = store.barbers.isLoading || store.barbers.isRefreshing;
  var appointmentsLoading = store.appointments.isLoading || store.appointments.isRefreshing;
  return {
    networkActivityIndicatorVisible: barbersLoading || appointmentsLoading
  };
}

export default connect(select)(Main);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 60 : 0
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  tabViewWithoutPadding: {
    padding: 0,
  }
});
