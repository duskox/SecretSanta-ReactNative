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
  display: 'flex',
  flex: 1,
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
  }

  static navigationOptions = {
    title: 'Root',
    header: null,
  };

  userInStateHasEverything() {
    if (this.state.user === undefined) {
      return false;
    } else {
      if (this.state.user.email === undefined) {
        return false;
      } else if (this.state.user.name === undefined) {
        return false;
      } else if (this.state.user.id === undefined) {
        return false;
      } else if (this.state.user.accessToken === undefined) {
        return false;
      } else if (this.state.user.serverAuthCode === undefined) {
        return false;
      }
    }
    return true;
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    const { navigate } = this.props.navigation;
  }

  googleSignIn() {
    const { navigate } = this.props.navigation;

    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      // play services are available. can now configure library
      console.log("ClientID for Google:", CLIENT_ID)
      GoogleSignin.configure({
        scopes: [],
        webClientId: CLIENT_ID,
        offlineAccess: true
      })
      .then(() => {
        GoogleSignin.currentUserAsync().then((user) => {
          if(user) {
            this.setState({user: user});
            navigate('JoinRaffleScreen', { user: user });
          } else {
            GoogleSignin.signIn()
            .then((user) => {
              this.setState({user: user});
              navigate('JoinRaffleScreen', { user: user });
            })
            .catch((err) => {
              // console.log('------------- WRONG SIGNIN -------------', err);
            })
            .done();
          }
        }).done();
      });
    })
    .then((result) => {
      console.log("What is here:", result)
      console.log("****************************", GoogleSignin.currentUser())
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    });
  }

  render() {
    return (
      <View style={containerRoot} >
        <Image source={require('../../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
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
