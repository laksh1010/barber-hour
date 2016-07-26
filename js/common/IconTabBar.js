import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import BarberIcon from './BarberIcon';
import Touchable from './Touchable';

export default class IconTabBar extends React.Component {
  render() {
    return(
      <View>
        <View style={[styles.tabs, this.props.style, ]}>
          {this.props.tabs.map((tab, i) => {
            const IconComponent = tab === 'event' ? Icon : BarberIcon;
            const color = this.props.activeTab == i ? 'rgb(59,89,152)' : 'rgb(204,204,204)';
            return(
              <Touchable style={styles.tab} key={tab} onPress={() => this.props.goToPage(i)}>
                <View style={styles.tab}>
                  <IconComponent
                    name={tab}
                    size={30}
                    color={color}/>
                  <Text style={[styles.title, {color: color}]}>{this.props.titles[i]}</Text>
                </View>
              </Touchable>
            )
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 55,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: 12,
  }
});
