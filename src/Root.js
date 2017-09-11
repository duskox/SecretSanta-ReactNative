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

const deviceWidthDIP = Dimensions.get('window').width;
const deviceHeightDIP = Dimensions.get('window').height;

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text : '', visibleHeight: Dimensions.get('window').height };
  }

  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShowHandler.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHideHandler.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    return (
      <View style={ [styles.container, {height: this.state.visibleHeight}] } >
        <Image source={require('../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
        <View style={styles.inputContainer}>
          <Button
            containerStyle={styles.buttonContainerStyle}
            style={styles.buttonStyle}
            onPress={onLoginPress}
          >
          Login
          </Button>
          <Button
            containerStyle={styles.buttonContainerStyle}
            style={styles.buttonStyle}
            onPress={onRegisterPress}
          >
          Register
          </Button>
        </View>
      </View>
    );
  }
}

function onLoginPress() {
  console.log('Login!');
}

function onRegisterPress() {
  console.log('Register!');
}

function keyboardDidShowHandler(e) {
  let newWindowSize = Dimensions.get('window').height - e.endCoordinates.height;
  console.log("Screen size should be: ", newWindowSize);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  this.setState({
    visibleHeight: newWindowSize,
  });
}

function keyboardDidHideHandler(e) {
  console.log("Screen size should be: ", Dimensions.get('window').height);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  this.setState({
    visibleHeight: Dimensions.get('window').height,
  });
}