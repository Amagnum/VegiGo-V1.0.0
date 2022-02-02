import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,

} from "react-native";
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import RenderCartItem from '../components/RenderCartTile';

//import CartButton from "./common/CartButton";

class CartScreen extends React.Component {
  constructor(props) {
    super(props);
  }


 checkTotalPrice = ()=> {
    let json = this.props.cartItem
    let totalprice = 0;
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const element = json[key];
        totalprice = totalprice + element.price
      }
    }
    return totalprice
  }


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Vegi Cart",
      headerRight: (<View style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
      }}>
      </View>

      )
    };
  };
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
          <ScrollView style={styles.container}>
            {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */
              console.warn(this.props.cartItem)}

            <FlatList
              data={this.props.cartItem}
              keyExtractor={(item, index) => item.atitle}
              renderItem={({ item }, ) => (
                <RenderCartItem
                  atitle={item.atitle}
                  image={item.image}
                  price={item.price}
                  quantity={item.quantity}
                  base={item.base}
                  avail={item.avail}
                  factor={item.factor}
                />
              )}
            />

          </ScrollView>
        </View>

        <View style={{
          height: 60,
          backgroundColor: '#fffdaf',
          flexDirection:'row'
        }}>
          <View style={{
          flex: 1,
          justifyContent: 'flex-start'
        }} >
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}> TOTAL PRICE : </Text>
            <Text style={{ fontSize: 24, color: "#ef6136", fontWeight: 'bold', paddingTop:0}}> ₹{this.checkTotalPrice()} </Text>
          </View>

          <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}>
            
          <Button 
          disabled={!this.props.cartItem?true:false}
          style={{
                    fontSize: 18, color: 'white'
                }} title="Continue"
                    buttonStyle={{
                        
                        padding: 8,
                        marginRight: 10,
                        width: 100,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen',
                        alignItems: 'center',

                    }}
                    onPress={() => {this.props.navigation.navigate('FormScreen')
                    }} />
          </View>


        </View>

      </View>
    );
  }
}



const mapStateToProps = (state) => {

  return {
    cartItem: state,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
export default connect(mapStateToProps)(CartScreen);