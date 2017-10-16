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
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text : '', visibleHeight: Dimensions.get('window').height };
    this.onLoginWithGooglePress = this.onLoginWithGooglePress.bind(this);

  }

  static navigationOptions = {
    title: 'Root',
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={ [styles.container, {height: this.state.visibleHeight}] } >
        <GoogleSigninButton
          style={{ width: 48, height: 48, marginTop: 20, marginBottom: 20 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn.bind(this)}/>
          
        <Image source={require('../../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
        <TouchableOpacity onPress={() => navigate('GoogleSignInWebView')}>
          <MyButton/>
        </TouchableOpacity>
      </View>
    );
  }

  onLoginWithGooglePress() {
    console.log("this.props:", this.props);
  }
}

function MyButton(props) {
  return (
    <View style={styles.googleButtonStyle}>
        <Icon name="google--with-circle" size={40} color="white" style={{marginTop: 4, marginBottom: 4, marginRight: 4, marginLeft: 8,}} />
        <Text style = {{fontSize: 25, color: 'white', alignSelf: 'center', marginRight: 8}}>Login with Google</Text>
    </View>
  );
}

// Code below is for occasion when an input field is present and keyboard pops up
// so the screen should accomodate the keyboard and not be overlayed
// by it.

keyboardDidShowListener = {};
keyboardDidHideListener = {};

function componentWillMount() {
  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShowHandler.bind(this));
  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHideHandler.bind(this));
}

function componentWillUnmount() {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
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