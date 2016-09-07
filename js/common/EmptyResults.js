import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import BarberIcon from './BarberIcon';

const EmptyResults = (props) => {
  return(
    <View style={styles.container}>
      <BarberIcon name={props.icon} size={80} color='#003459' style={styles.icon} />
      <Text style={styles.message}>{props.message}</Text>
    </View>
  );
};

export default EmptyResults;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: 5
  },
  message: {
    fontSize: 18,
    textAlign: 'center'
  }
});
