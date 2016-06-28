import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

const LargeButton = (props) => {
  return(
    <View style={styles.container}>
      <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={props.onPress}>
        <View style={styles.button}>
          <Text>{props.text}</Text><Text style={styles.link}>{props.linkText}</Text>
        </View>
      </TouchableNativeFeedback>
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
