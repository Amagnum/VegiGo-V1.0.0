import React, {Component} from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import CartScreen from '../screens/VendorCartItems'
import Vegetable from '../screens/Vegetable'
import FormScreen from '../screens/FormScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import LoginScreen from '../screens/authentication/LoginScreen'
import Fruits from '../screens/Fruits'
import ConfirmationScreen from '../screens/ConfirmationScreen'
import orderHistory from '../screens/orderHistory'


const FruitsStack = createStackNavigator({
  Fruits : { screen: Fruits },
  FormScreen : { screen: FormScreen },
  LoginScreen : { screen: LoginScreen},
  CartScreen : { screen: CartScreen},
  ConfirmationScreen : {screen: ConfirmationScreen},
  orderHistory: {screen: orderHistory}
});

const VegetableStack = createStackNavigator({
  Vegetable : { screen: Vegetable },
  FormScreen : { screen: FormScreen },
  LoginScreen : { screen: LoginScreen},
  CartScreen : { screen: CartScreen},
  ConfirmationScreen : {screen: ConfirmationScreen},
  orderHistory: {screen: orderHistory}
});


const TabNavigator = createBottomTabNavigator({
  Fruits: { screen: FruitsStack,
    navigationOptions:{
      tabBarLabel:'Fruits',
      tabBarIcon: ({tintColor})=>(
        <MaterialCommunityIcons name="food-apple" color={tintColor} size={24}/>
      )
    }},


  Vegetable: { screen: VegetableStack,
    navigationOptions:{
      tabBarLabel:'Vegetables',
      tabBarIcon: ({tintColor})=>(
        <MaterialCommunityIcons name="carrot" color={tintColor} size={24}/>
      )
    }},
},{
  //route config
  initialRouteName: 'Fruits',
  order: ['Fruits', 'Vegetable'],
  navigationOptions:{

  }, 
  tabBarOptions:{
    activeTintColor: '#ef6136',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#8AC149',
    },
  }
});

FruitsStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if ( routeName == 'CartScreen' ||  routeName == 'FormScreen' || routeName == 'LoginScreen' || routeName == 'ConfirmationScreen' || routeName == 'orderHistory' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}


VegetableStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if ( routeName == 'CartScreen' || routeName == 'FormScreen'|| routeName == 'LoginScreen' || routeName == 'ConfirmationScreen' || routeName == 'orderHistory') {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
  }
}



export default CreateNavs = createAppContainer(TabNavigator);