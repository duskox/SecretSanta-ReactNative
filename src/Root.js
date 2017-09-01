import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  AppRegistry
  } from 'react-native';

export default class Root extends React.Component {
  render() {
      let pic = {
        uri: './assets/santa.jpg'
      };
      return (
        <View style={{backgroundColor: '#00f', flex: 1,}}/>
      );
  }
}
