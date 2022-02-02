import React from 'react';
import {createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';
import { Platform, Dimensions } from 'react-native';

import WelcomeScreen from "../screens/WelcomeScreen"

const WIDHT = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDHT*0.83,
}

const DrawerNavigator = createDrawerNavigator({
    Welcome: {
        screen: WelcomeScreen
    },
},
    DrawerConfig
);

const AppContainer = createAppContainer(DrawerNavigator);
export default AppContainer;