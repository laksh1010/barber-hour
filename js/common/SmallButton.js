import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

const SmallButton = (props) => {
  return(
    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={props.onPress}>
      <View style={[styles.containerStyle, props.containerStyle]}>
        <Text style={[styles.textStyle, props.textStyle]}>{props.text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SmallButton;

var styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#8E8E8E',
    fontSize: 14
  }
});
