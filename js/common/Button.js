import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

const Button = (props) => {
  const background = props.outline ? TouchableNativeFeedback.SelectableBackground() : TouchableNativeFeedback.Ripple('#004575');
  const containerStyle = props.outline ? styles.outlineContainer : styles.solidContainer;
  const textStyle = props.outline ? styles.outlineText : styles.solidText;

  return(
    <TouchableNativeFeedback background={background} onPress={props.onPress}>
      <View style={[containerStyle, styles.container, props.containerStyle]}>
        <Text style={[textStyle, styles.text, props.textStyle]}>{props.text}</Text>
      </View>
    </TouchableNativeFeedback>
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
