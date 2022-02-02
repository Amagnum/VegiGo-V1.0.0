import React from 'react';
import {
  Image,
  Platform,
  View,
  StyleSheet,
  Text,

} from 'react-native';
import { Button } from 'react-native-elements';

export default class ConfirmationScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Order Confirmation",
    headerLeft: null,
  };

  render() {
    return (
      <View style={{padding: 20, marginTop: 20, flex:1, alignItems:'center', justifyContent:'center'}}>
      <Image source={require('../assets/pic3.png')} />
      <Button style={{
                    fontSize: 18, color: 'white'
                }} title="Continue Shopping"
                    
                        
                    buttonStyle={{
                        marginTop: 15,
                        padding: 8,
                        marginLeft: 80,
                        marginRight: 80,
                        width: 240,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen',
                        alignItems: 'center',

                    }}
                    onPress={() => { this.props.navigation.navigate('Fruits')
                       }}
                    />
      
  </View>
    )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
