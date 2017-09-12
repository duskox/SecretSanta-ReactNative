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

function MyButton(props) {
  return (
    <Button style={styles.googleButtonStyle}>
      <Icon.Button name = "google--with-circle" backgroundColor="#d34836" size={80} >
        <Text style = {{fontSize: 15, color: 'white'}}>Login with Google</Text>
      </Icon.Button>
    </Button>
  );
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
        <MyButton onPress=''/>
      </View>
    );
  }
}