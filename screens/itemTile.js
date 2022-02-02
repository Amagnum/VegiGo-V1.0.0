
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Left,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'


class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
    this.props.handleNaviagation();
  };


  render() {
    const ModalData = {
      price: this.props.price,
      name: this.props.atitle,
      base: this.props.base,
      factor: this.props.factor,
      quantity: this.props.quantity,
      image: this.props.image,
      funct:this.props.addItemToCart,
    }
    return (

        <View
          //elevation={2}
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#ffffff",
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.3,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          <Image
            style={{
              width: 108,
              height: 108,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4
            }}
            source={{ uri: this.props.image }}
          />
          <View
            style={{
              padding: 16
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#333"
              }}
            >
              {this.props.atitle}{" "}
              <Text
                style={{
                  fontSize: 14,
                  color: "#999"
                }}
              >
                {this.props.localname}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666"
              }}
            >
              {this.props.avail ? (
                <Text style={{ color: "#4caf50", fontWeight: "bold" }}>
                  Available
              </Text>
              ) : (
                  <Text style={{ color: "#a92319", fontWeight: "bold" }}>
                    Unavailable
              </Text>
                )}
            </Text>


            <View Left
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%"
              }}
            >
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  width: 130,
                  color: "#ef6136"
                }}
              >
                ₹{this.props.price}

                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    paddingTop: 7,
                  }}
                >
                  {" "} for {this.props.quantity} {this.props.factor}
                </Text>

              </Text>



              <Button 
               disabled={this.props.avail?false:true}
               onPress={() => this.props.callModal(ModalData)}
                title="ADD"
                style={{
                  backgroundColor: "4099ff",
                  color: "#fff",
                  paddingLeft: 36,
                  paddingRight: 16,
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              />

            </View>


          </View>
        </View>

    );
  }
}


const mapDispatchToProps = (dispatch) => {

  return {
    addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}

export default connect(null, mapDispatchToProps)(ListItem);
