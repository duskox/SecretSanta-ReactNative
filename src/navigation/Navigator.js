import { StackNavigator } from 'react-navigation';
import Root from '../component/Root.js';
import GoogleSignInWebView from '../component/GoogleSignInWebView.js';

export const SantaAppNavigator = StackNavigator({
  Root: { screen: Root },
  GoogleSignInWebView: { screen: GoogleSignInWebView },
});