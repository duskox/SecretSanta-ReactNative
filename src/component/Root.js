import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  Dimensions,
  Keyboard,
  DeviceEventEmitter,
  LayoutAnimation,
  AppRegistry,
  AppState,
  } from 'react-native';
import styles from '../../style/styles';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Config from 'react-native-config';
import { CLIENT_ID } from 'react-native-dotenv';

AppRegistry.registerComponent('SantaApp', () => Root);

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text : '', visibleHeight: Dimensions.get('window').height };
    this.state = { user: undefined };
    // googleSignIn = this._singIn.bind(this);
  }

  static navigationOptions = {
    title: 'Root',
    header: null,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    console.log("handling ***************************:", this.state);
    // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    //   console.log('App has come to the foreground!')
    // }
    // this.setState({appState: nextAppState});
    if (this.state.user) {

    }
  }

  googleSignIn() {
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
            console.log("This first:",this)
            this.setState({user: user});
          } else {
            GoogleSignin.signIn()
            .then((user) => {
              console.log("This second:",this)
              console.log("User:",user);
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

  render() {
    const { navigate } = this.props.navigation;

    console.log("this.props:", this.props);
    console.log("Config:", Config);

    return (
      <View style={styles.containerRoot} >
        <Image source={require('../../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
        <Text></Text>
        <GoogleSigninButton
          style={styles.googleSignInStyle}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light}
          onPress={this.googleSignIn.bind(this)}
        />
      </View>
    );
  }

}
