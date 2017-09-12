import { StackNavigator } from 'react-navigation';

import Root from '../component/Root.js';
import Register from '../component/Register.js';

export const SantaAppNavigator = StackNavigator({
  Root: { screen: Root },
  Register: { screen: Register },
});