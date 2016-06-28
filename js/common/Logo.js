import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';

const Logo = (props) => {
  return(
    <Image
      source={require('../../img/logo.png')}
      style={[styles.logo, props.style]} />
  );
};

export default Logo;

var styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    margin: 10,
    alignSelf: 'center'
  }
});
