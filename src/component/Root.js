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

/***
 *     ________________        _       _______  _______
 *    (  ____ \__   __/\     /( \     (  ____ \(  ____ \
 *    | (    \/  ) (  ( \   / ) (     | (    \/| (    \/
 *    | (_____   | |   \ (_) /| |     | (__    | (_____
 *    (_____  )  | |    \   / | |     |  __)   (_____  )
 *          ) |  | |     ) (  | |     | (            ) |
 *    /\____) |  | |     | |  | (____/\ (____/\/\____) |
 *    \_______)  )_(     \_/  (_______(_______/\_______)
 *
 */

const containerRoot = {
  flexWrap: 'wrap',
  backgroundColor: '#0f0',
  alignItems: 'center',
  justifyContent: 'space-between',
}


/***
 *     _______ _______ _______ _______ _______ _       _______ _      _________
 *    (  ____ (  ___  |       |  ____ |  ___  | (    /(  ____ ( (    /\__   __/
 *    | (    \/ (   ) | () () | (    )| (   ) |  \  ( | (    \/  \  ( |  ) (
 *    | |     | |   | | || || | (____)| |   | |   \ | | (__   |   \ | |  | |
 *    | |     | |   | | |(_)| |  _____) |   | | (\ \) |  __)  | (\ \) |  | |
 *    | |     | |   | | |   | | (     | |   | | | \   | (     | | \   |  | |
 *    | (____/\ (___) | )   ( | )     | (___) | )  \  | (____/\ )  \  |  | |
 *    (_______(_______)/     \|/      (_______)/    )_|_______//    )_)  )_(
 *
 */

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text : '', visibleHeight: Dimensions.get('window').height, user: undefined };
    // googleSignIn = this._singIn.bind(this);
  }

  static navigationOptions = {
    title: 'Root',
    header: null,
  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>>>>>> Adding change listener to app state');
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    console.log('Remove change listener to app state <<<<<<<<<<<<<<<<<<<<<<');
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    console.log("handling ***************************:", this.state);
    // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    //   console.log('App has come to the foreground!')
    // }
    // this.setState({appState: nextAppState});
    if (this.state.user) {
      console.log('BLAaaaaaaaaaaaaaaaaaaaaaaaaa!')
      navigate('JoinRaffleScreen');
    }
  }

  googleSignIn() {
    const { navigate } = this.props.navigation;

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
            console.log("This first-----------------------:",this)
            this.setState({user: user});
            navigate('JoinRaffleScreen');
          } else {
            GoogleSignin.signIn()
            .then((user) => {
              console.log("This second++++++++++++++++++++:",this)
              console.log("User>>>>>>>>>>>>>>>:",user);
              this.setState({user: user});
              navigate('JoinRaffleScreen');
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
    console.log("this.props:", this.props);
    console.log("Config:", Config);

    return (
      <View style={containerRoot} >
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

AppRegistry.registerComponent('SantaApp', () => Root);
