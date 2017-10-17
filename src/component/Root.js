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
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Config from 'react-native-config';
import { CLIENT_ID } from 'react-native-dotenv';


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

    console.log("this.props:", this.props);
    console.log("Config:", Config);

    return (
      <View style={ [styles.container, {height: this.state.visibleHeight}] } >
        <GoogleSigninButton
          style={{ width: 130, height: 48, marginTop: 20, marginBottom: 20 }}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signIn.bind(this)}
        />
        <Image source={require('../../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
      </View>
    );
  }

  onLoginWithGooglePress() {
    console.log("this.props:", this.props);
  }

  _signIn() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      // play services are available. can now configure library
      GoogleSignin.configure({
        scopes: [],
        webClientId: CLIENT_ID,
        offlineAccess: true
      })
      .then(() => {
        GoogleSignin.currentUserAsync().then((user) => {
          if(user) {
            console.log('USER', user);
            this.setState({user: user});
          } else {
            GoogleSignin.signIn()
            .then((user) => {
              console.log(user);
              this.setState({user: user});
            })
            .catch((err) => {
              console.log('WRONG SIGNIN', err);
            })
            .done();
          }
        }).done();
      });
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    });
  }

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