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
  } from 'react-native';
import styles from '../../style/styles';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Config from 'react-native-config';
import { CLIENT_ID } from 'react-native-dotenv';


export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text : '', visibleHeight: Dimensions.get('window').height };
    this._signIn = this._singIn.bind(this);
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
        <Image source={require('../../assets/santa.jpg')} resizeMode='contain' style={styles.imageItem}/>
        <GoogleSigninButton
          style={styles.googleSignInStyle}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signIn.bind(this)}
        />
      </View>
    );
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
