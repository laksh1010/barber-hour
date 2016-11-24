import React, { Component } from 'react';
import {
  View,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

const API21 = Platform['Version'] >= 21;

const Touchable = (props) => {
  var background;
  if (props.backgroundColor && API21) {
    background = TouchableNativeFeedback.Ripple(props.backgroundColor);
  } else {
    background = TouchableNativeFeedback.SelectableBackground();
  }

  return(
    <TouchableNativeFeedback background={background} onPress={props.onPress}>
      <View style={props.style}>
        {props.children}
      </View>
    </TouchableNativeFeedback>
  );
};

export default Touchable;
