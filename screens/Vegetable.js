import React from "react";
import * as firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  ScrollView
} from "react-native";
import ListItem from "./itemTile";
import AddModal from "./ModalScreen";
import { SearchBar } from 'react-native-elements';
//import CartButton from "./common/CartButton";


const config = {
  apiKey: "AIzaSyCfyHRIbpIbtciJ0Zfs8BczcnDfXZlbF1o",
  authDomain: "vegigo-198a7.firebaseapp.com",
  databaseURL: "https://vegigo-198a7.firebaseio.com",
  projectId: "vegigo-198a7",
  storageBucket: "vegigo-198a7.appspot.com",
  messagingSenderId: "234756838777"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


export default class Vegetable extends React.Component {
  constructor(props) {
    super(props);
    this.fullvegetables = [],
    this.state = {
      query: '',
      vegetables: [],
      vegetable: {
        atitle: '',
        avail: '',
        base: '',
        price: '',
        image: '',
      }
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (<View><Text><Text
        style={{
          fontSize: 21,
          fontWeight: "bold",
          width: 130,
          color: "#ef6136"
        }}>  Vegi
      </Text><Text
        style={{
          fontSize: 21,
          fontWeight: "bold",
          width: 130,
          color: "#4caf50"
        }}
      >Go
      </Text></Text></View>),
      
      headerRight: (<View style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
      }}>
        <TouchableHighlight
          style={{ marginRight: 10 }}
          underlayColor='white'
          onPress={() => {
            navigation.navigate("orderHistory");
          }}>
          <Image style={{ width: 42, height: 42 }}
            source={require('../assets/addItem.png')} />
        </TouchableHighlight>

        <TouchableHighlight
          style={{ marginRight: 10 }}
          onPress={() => {
            navigation.navigate("CartScreen");
          }}>
          <Image style={{ width: 35, height: 35 }}
            source={require('../assets/shoppingCart.jpg')} />
        </TouchableHighlight>
      </View>

      )
    };
  };


  componentDidMount() {
    firebase.database().ref().child('vegigo/vegitables').once('value', snapshot => {
      const data = snapshot.val()
      if (data) {
        const intiVegetables = [];
        Object.keys(data).forEach(vegitable => intiVegetables.push(data[vegitable]));
        this.fullvegetables = intiVegetables;
        //console.warn(intiVegetables);
        this.setState({
          vegetables: intiVegetables
        })
      }
    });
  }



 
  searchFilterFunction = text => {
    this.setState({query : text});
    const newData = this.fullvegetables.filter(item => {
      const itemData = `${item.atitle.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ vegetables: newData });
  };


  callModal = (x) => {
    this.refs.modal.showAddModal();
    this.refs.modal.gettingData(x);

  };

  render() {
    return (
    
      <ScrollView>
      <SearchBar
          placeholder="Search Here..." value={this.state.query} lightTheme round onChangeText={this.searchFilterFunction} />
      
      <View style={styles.container}>
        <FlatList
          data={this.state.vegetables}
          keyExtractor={item => item.atitle}
          renderItem={({ item }) => (
            <ListItem
              atitle={item.atitle}
              image={item.image}
              avail={item.avail}
              price={item.price}
              factor={item.factor}
              quantity={item.quantity}
              callModal={this.callModal}
            />
          )}
        />
        <AddModal ref={'modal'} parentFlatList={this}></AddModal>
      </View></ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
