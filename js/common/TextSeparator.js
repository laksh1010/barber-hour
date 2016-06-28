import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const TextSeparator = (props) => {
  return(
    <View style={[styles.container, props.style]}>
      <View style={styles.separator} />
      <Text style={styles.text}>  OU  </Text>
      <View style={styles.separator} />
    </View>
  );
};

export default TextSeparator;

var styles = StyleSheet.create({
  text: {
    fontWeight: 'bold'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#DCDCDC',
    flex: 1,
  }
});
