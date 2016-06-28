import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Toolbar from '../common/Toolbar';
import IconTabBar from '../common/IconTabBar';
import BarberList from './BarberList';
import HaircutHistory from './HaircutHistory';
import Profile from './Profile';

export default class Main extends Component {
  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar border navigator={this.props.navigator} />
        <ScrollableTabView tabBarPosition='bottom'
          renderTabBar={() => <IconTabBar titles={['Barbearias', 'Histórico de cortes', 'Minha conta']} />}>
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
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
