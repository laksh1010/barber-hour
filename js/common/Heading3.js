import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

const Heading3 = (props) => {
  return(
    <Text style={[styles.heading3, props.style]}>{props.children}</Text>
  );
};

export default Heading3;

var styles = StyleSheet.create({
  heading3: {
    color: '#969696',
    fontSize: 14,
  }
});
