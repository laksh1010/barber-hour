import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

const Heading2 = (props) => {
  return(
    <Text style={[styles.heading2, props.style]}>{props.children}</Text>
  );
};

export default Heading2;

var styles = StyleSheet.create({
  heading2: {
    color: '#111111',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
