import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Touchable from './Touchable';

const Button = (props) => {
  const backgroundColor = props.outline ? null : '#004575';
  const containerStyle = props.outline ? styles.outlineContainer : styles.solidContainer;
  const textStyle = props.outline ? styles.outlineText : styles.solidText;
  const opacity = props.disabled ? { opacity: .6 } : { opacity: 1 };
  const onPress = props.disabled ? null : props.onPress;

  return(
    <Touchable
      backgroundColor={backgroundColor}
      onPress={onPress}
      style={[containerStyle, styles.container, props.containerStyle, opacity]}
    >
      <Text style={[textStyle, styles.text, props.textStyle]}>{props.text}</Text>
    </Touchable>
  );
};

export default Button;

var styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  solidContainer: {
    borderColor: '#00223A',
    backgroundColor: '#003459',
  },
  outlineContainer: {
    backgroundColor: 'white',
    borderColor: '#003459',
  },
  solidText: {
    color: 'white',
  },
  outlineText: {
    color: '#003459',
  },
});
