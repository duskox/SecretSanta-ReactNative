import { StackNavigator } from 'react-navigation';
import Root from '../component/Root.js';
import JoinRaffleScreen from '../component/JoinRaffleScreen.js';
import RaffleInfoScreen from '../component/RaffleInfoScreen';

export const SantaAppNavigator = StackNavigator({
  Root: { screen: Root },
  JoinRaffleScreen: { screen: JoinRaffleScreen },
  RaffleInfoScreen: { screen: RaffleInfoScreen },
});