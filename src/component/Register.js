import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  Keyboard,
  DeviceEventEmitter,
  TextInput,
  LayoutAnimation,
  } from 'react-native';
import styles from '../style/styles';
import Button from 'react-native-button';

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text : '', visibleHeight: Dimensions.get('window').height };
  }

  render() {
    return (
      <View style={ [styles.container, {height: this.state.visibleHeight}] } >
        <Image source={require('../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
        <TextInput></TextInput>
        <TextInput></TextInput>
        <TextInput></TextInput>
        <Button>Sign in</Button>
      </View>
    );
  }
}