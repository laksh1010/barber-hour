import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Touchable from './Touchable';

const LargeButton = (props) => {
  const opacity = props.disabled ? { opacity: .6 } : { opacity: 1 };
  const onPress = props.disabled ? null : props.onPress;

  return(
    <View style={styles.container}>
      <Touchable style={[styles.button, opacity]} onPress={onPress}>
        <View style={[styles.button, opacity]}>
          <Text>{props.text}</Text><Text style={styles.link}>{props.linkText}</Text>
        </View>
      </Touchable>
    </View>
  );
};

export default LargeButton;

var styles = StyleSheet.create({
  link: {
    fontWeight: 'bold'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  container: {
    borderTopWidth: 1,
    borderColor: '#DCDCDC',
    flex: 1,
  },
});
