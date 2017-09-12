import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  DeviceEventEmitter,
  TextInput,
  LayoutAnimation,
  } from 'react-native';
import styles from '../../style/styles';
import Button from 'react-native-button';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import Register from './Register';


export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text : '', visibleHeight: Dimensions.get('window').height };
  }

  static navigationOptions = {
    title: 'Root',
    header: null,
  };

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
        <Image source={require('../../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
        <TouchableOpacity onPress={onLoginWithGooglePress}>
          <MyButton />
        </TouchableOpacity>
      </View>
    );
  }
}

function MyButton(props) {
  return (
    <View style={styles.googleButtonStyle}>
      <Icon.Button name = "google--with-circle" backgroundColor="#d34836" size={40}>
        <Text style = {{fontSize: 25, color: 'white'}}>Login with Google</Text>
      </Icon.Button>
    </View>
  );
}

function onLoginWithGooglePress() {
  console.log("BLA!");
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