import React, {Component} from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Fruits from './screens/Fruits'
import Vegetable from './screens/Vegetable'
import FormScreen from './screens/FormScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CreateNavs from './navigator/createNavs'
import {Provider} from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store} >
      <CreateNavs />
      </Provider>    
    )
  } 
}

export default App

