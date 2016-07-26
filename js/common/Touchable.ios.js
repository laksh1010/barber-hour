import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';

const Touchable = (props) => {
  const backgroundColor = props.backgroundColor ? props.backgroundColor : 'rgba(245, 245, 245, 0.91)';

  return(
    <TouchableHighlight style={props.style} underlayColor={backgroundColor} onPress={props.onPress}>
      {props.children}
    </TouchableHighlight>
  );
};

export default Touchable;
