import React, { Component } from 'react';
import {
  View,
  TouchableNativeFeedback,
} from 'react-native';

const Touchable = (props) => {
  var background;
  if (props.backgroundColor) {
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
