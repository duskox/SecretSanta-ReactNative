import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  Dimensions,
  Keyboard,
  DeviceEventEmitter,
  TextInput,
  LayoutAnimation,
  AppRegistry,
  } from 'react-native';
import styles from '../../style/styles';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Entypo';

function onLoginWithGooglePress() {
  console.log("BLA!");
}

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text : '', visibleHeight: Dimensions.get('window').height };
  }

  static navigationOptions = {
    title: 'Register',
    header: null,
  };

  render() {
    return (
      <View style={ [styles.container, {height: this.state.visibleHeight}] } >
        <Image source={require('../../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
      </View>
    );
  }
}