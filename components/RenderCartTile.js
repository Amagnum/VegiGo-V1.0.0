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

class RenderCartItem extends React.Component {
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
    return (
      //<TouchableOpacity onPress={this.props.callModal}>
      <View
        //elevation={2}
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#dbffbf",
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
            borderTopLeftRadius: 15,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 15
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
              fontSize: 20,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            {this.props.atitle}

          </Text>

          <View Left
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%"
            }}
          ><View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: "space-between",
          }}>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  width: 130,
                  color: "#ef6136"
                }}
              >
                ₹{this.props.price}
              </Text>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  width: 130,
                  color: "#4caf50"
                }}
              >
              {this.props.quantity} {this.props.factor}
              </Text>



            </View>

            <Button Right
                onPress={() =>{ 
                  const data={
                              atitle:this.props.atitle,
                          }
                  {this.props.removeItem(data)}
              }}
                title="REMOVE"
                color="#ef6136"
                style={{
                  backgroundColor: "#ef6136",
                  color: "#ef6136",
                  paddingLeft: 36,
                  paddingRight: 16,
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              />

          </View>


        </View>
      </View>

      // </TouchableOpacity>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      removeItem : (product) => dispatch({type:'REMOVE_FROM_CART', payload : product})
  }
}

export default connect( null,mapDispatchToProps)(RenderCartItem);
