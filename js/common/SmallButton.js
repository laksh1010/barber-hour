import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Touchable from './Touchable';

const SmallButton = (props) => {
  return(
    <Touchable style={[styles.containerStyle, props.containerStyle]} onPress={props.onPress}>
      <View>
        <Text style={[styles.textStyle, props.textStyle]}>{props.text}</Text>
      </View>
    </Touchable>
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
