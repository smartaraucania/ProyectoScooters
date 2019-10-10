import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import LoginScreen2 from '../screens/LoginScreen2';
import DrawerNavigation from '../screens/DrawerNavigation';
import Register from '../screens/Register';
import CodigoQR from '../components/CodigoQR';
import Menu from '../Details/Menu';




import { StyleSheet, View } from 'react-native';

const RootStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    Register: Register,
    DrawerNavigation: DrawerNavigation,
    LoginScreen2: LoginScreen2, 
    CodigoQR : CodigoQR,
    Menu: Menu,
  },
  {
    initialRouteName: 'LoginScreen',
    
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default function Navigation() {

  return (
    <View style={styles.container}>
      <AppContainer />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});