import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker, FlatList, ScrollView, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux'

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


class FormScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      order: {
        customerAddress: '',
        customerMobile: '',
        customerName: '',
        basket: this.props.cartItem,
        totalItems: this.props.cartItem.length,
        paymentMode: 'COD',
      },
      prevMobile: '',
      totalPrice: 0,
      minOrders: {},
    }
    this.addItem = this.addItem.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:'Delivery'
    };
  };


  _retrieveData = async () => {
    try {
      const address = await AsyncStorage.getItem('address');
      const name = await AsyncStorage.getItem('name');
      const mobile = await AsyncStorage.getItem('mobile');
      this.setState({
        prevMobile: mobile,
        order: {
          customerAddress: address,
          customerName: name,
          customerMobile: mobile,
        },
      })
    } catch (error) {
      console.warn(error)
    }
  };

  componentDidMount() {
    this._retrieveData()
    this.CheckTotalPrice()
    console.warn('extracted')
  }

  CheckTotalPrice = () => {
    let json = this.props.cartItem
    let totalprice = 0;
    let minOrder = {}
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const element = json[key];
        totalprice = totalprice + element.price
        minOrder = { ...minOrder, [key]: '» ' + element.atitle + ' ₹' + element.price + ' (' + element.quantity + ' ' + element.factor + ')' }
      }
    }
    console.warn(minOrder)

    totalprice > 150 ? totalprice=totalprice  : totalprice=totalprice+25

    this.setState(prev=>({
      minOrders: {
        orders: minOrder,
      },
      totalPrice: totalprice,
    }))

    return totalprice
  }

  addItem() {
    if (!this.state.order.customerName || !this.state.order.customerAddress || !this.state.order.customerMobile) return alert("Please enter Details");  
   
    let isMobileSame;
    (this.state.order.customerMobile == this.state.prevMobile) ? isMobileSame = 1 : isMobileSame = 0
    this.props.navigation.navigate('LoginScreen', { placeOrder: this.placeOrder, mobileN: '+91' + this.state.order.customerMobile, isMobileSame: isMobileSame })
    //this.placeOrder() 
    //this.props.navigation.navigate("ConfirmationScreen")
   
  }

  placeOrder() {
    let id = new Date
    let totalitems = this.props.cartItem.length
    id = id.valueOf()

    AsyncStorage.setItem('address', this.state.order.customerAddress)
    AsyncStorage.setItem('name', this.state.order.customerName)
    AsyncStorage.setItem('mobile', this.state.order.customerMobile)

    this.setState(prevState => ({
      order: {
        ...prevState.order,
        basket: this.props.cartItem,
        totalItems: totalitems,
        orderNumber: id + ':' + id % 1000,
        totalPrice: this.state.totalPrice,
        timestamp: (new Date).toLocaleString(),
        status: 'Unread'
      },
      minOrders: {
        ...prevState.minOrders,
        orderNumber: id,
        status: 'Unread',
        timestamp: (new Date).toLocaleString(),
        totalItems: totalitems,
        totalPrice: this.state.totalPrice,
        code: id % 1000
      }
    }), () => {
      const newOrder = firebase.database().ref()
        .child("vegigo_orders/" + id);
      const newOrderLive = firebase.database().ref()
        .child("vegigo_orders_live/" + this.state.order.customerMobile + '/' + this.state.order.orderNumber).set(this.state.minOrders);
      newOrder.set(this.state.order, () => this.setState({
        order: {}
      }))
      alert("Order Placed :" + id)
    })

  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.msgBox}>

          <Text>Name : {this.state.order.orderNumber}</Text>
          <TextInput placeholder='Your Name' style={{ height: 70 }}
            value={this.state.order.customerName}
            onChangeText={(text) => this.setState(prevState => ({
              order: {
                ...prevState.order,
                customerName: text
              }
            }))}
            style={styles.txtInput} />

          <Text>Address :</Text>
          <TextInput placeholder='Your Address'
            value={this.state.order.customerAddress}
            onChangeText={(text) => this.setState(prevState => ({
              order: {
                ...prevState.order,
                customerAddress: text
              }
            }))}
            style={styles.txtInput} />

          <Text>phone Number (10 digits):</Text>
          <TextInput placeholder='Mobile number'
            keyboardType="phone-pad"
            maxLength={10}
            value={this.state.order.customerMobile}
            onChangeText={(text) => this.setState(prevState => ({
              order: {
                ...prevState.order,
                customerMobile: text
              }
            }))}
            style={styles.txtInput} />

          <View style={styles.priceAndItems}>
            <Text style={{ fontSize: 15, backgroundColor: '#ffffff', color: '#ee5555', padding: 8 }} >₹{this.state.totalPrice} ({this.state.totalPrice-25}+25)</Text>
            <Text style={{ fontSize: 13, backgroundColor: '#eeeeee', color: '#666688', padding: 8 }}>{this.props.cartItem.length} Items</Text>
            <Text style={{ fontSize: 13, backgroundColor: '#ffffff', color: '#33cc33', padding: 8 }} >({(this.state.totalPrice > 150) ? 'free' : '₹25'}) Delivery in 24 hrs</Text>
          </View>

          <View>
            <FlatList
              data={this.props.cartItem}
              keyExtractor={(item, index) => item.atitle}
              renderItem={({ item }, ) => (
                <View style={styles.listItem}>
                  <Text> » {item.atitle}  ₹ {item.price} ({item.quantity} {item.factor})</Text>
                </View>
              )}
            />
          </View>
          <View>
            <Text>Payment Mode :</Text>
            <Picker
              selectedValue={this.state.order.paymentMode}
              style={{ height: 50, width: 100, padding: 10 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState(prevState => ({
                  order: {
                    ...prevState.order,
                    paymentMode: itemValue,
                  }
                }))
              }>
              <Picker.Item label="COD" value="COD" />
            </Picker>
          </View>

          <Button title='Place Order' onPress={this.addItem} />
          <Text style={{ fontSize: 10, backgroundColor: '#ffffff', color: '#ee5555', padding: 8 }}>Free Delivery for total price greater than ₹150</Text>     
          
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    //marginTop: 40,
  },
  msgBox: {
    padding: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  txtInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingLeft: 6,
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#dddddd',
  },
  priceAndItems: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignContent: 'space-between',
    backgroundColor: '#888888',

  }
});


const mapStateToProps = (state) => {
  return {
    cartItem: state
  }
}

export default connect(mapStateToProps)(FormScreen);