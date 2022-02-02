import React from "react";
import * as firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  ScrollView,
  Alert
} from "react-native";
import ListItem from "./itemTile";
import { SearchBar } from 'react-native-elements';
import AddModal from "./ModalScreen";

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


export default class Fruits extends React.Component {
  constructor(props) {
    super(props);
    this.fullfruits = [],

      this.state = {
        query:'',
        fruits: [],
        fruit: {
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
      </Text></Text></View>
),
      headerRight: (
        <View style={{
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
    //console.warn( firebase.database().ref().child('vigigo/fruits'));
    firebase.database().ref().child('vegigo/fruits').once('value', snapshot => {
      const data = snapshot.val()
      if (data) {
        const intiFruits = [];
        Object.keys(data).forEach(fruit => intiFruits.push(data[fruit]));
        this.fullfruits = intiFruits
        // console.warn(this.fullfruits);
        this.setState({
          fruits: intiFruits
        })
      }
    });

    // firebase.database().ref().child('vegigo/fruits').on("child_added", snapshot => {
    //   const data = snapshot.val();
    //   if (data) {
    //     this.setState(prevState => ({
    //       fruits: [data, ...prevState.fruits]
    //     }))
    //   }
    // })
  };


  searchFilterFunction = (text) => {
    this.setState({query : text});
    const newData = this.fullfruits.filter(item => {
      const itemData = `${item.atitle.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ fruits: newData });
  };


  callModal = (x) => {
    this.refs.modal.showAddModal();
    this.refs.modal.gettingData(x);

  };

  render() {
    return (
      <ScrollView><SearchBar
        placeholder="Search Here..." value={this.state.query} lightTheme round onChangeText={text => this.searchFilterFunction(text)} />
        <View style={styles.container}>

          <FlatList
            data={this.state.fruits}

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
