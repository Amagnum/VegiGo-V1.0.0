import React from "react";
import {
    View,
    Text,
    Dimensions,
    TextInput,
    Alert,
    Picker
} from "react-native";
import Modal from 'react-native-modalbox';
import { Button } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input';


var screen = Dimensions.get('window');

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            isButtonPressed: false,
            data: {
                name: '',
                base: '',
                price: '',
                factor: '',
                quantity: '',
                image: '',
                funct: '',
            }
        }
    }


    showAddModal = () => {
        this.refs.myModal.open();
    }

    gettingData = (data) => {
        this.setState({
            data: {
                name: data.name,
                base: data.base,
                price: data.price,
                factor: data.factor,
                quantity: data.quantity,
                image: data.image,
                funct: data.funct,
            }
        })
    }

    //calculatingQuantity = () => {
    //    console.warn(value);
    //    let data = Object.assign({}, this.state.data);    //creating copy of object
    //  data.totalCost = (this.state.data.price * value);     
    //data.totalQuantity = (this.state.data.quantity * value);                    //updating value
    // this.setState({data});
    //}
   componentDidMount(){
       this.setState({
                isButtonPressed:false
       })
   }

    render() {
        return (
            <Modal
                ref={'myModal'}
                style={{
                    position: 'absolute',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderRadius: 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                marginTop={20}
                position='center'
                backdrop={true}
                onClosed={() => { }}>

                <Text style={{
                    fontSize: 18,
                    color: "#333",
                    fontWeight: '600',
                    textAlign: 'center',
                    marginTop: 10,
                }}>{this.state.data.name}</Text>

                <Text style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    width: 130,
                    color: "#ef6136",
                    marginTop: -1,
                }}>₹{this.state.data.price}
                <Text
                    style={{
                        fontSize: 14,
                        color: "#666",
                        paddingTop: 7,
                    }}
                >{" "} for {this.state.data.factor}</Text>
                </Text>



                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    // marginTop: 20
                }}>Enter Quantity</Text>
                <NumericInput
                    value={this.state.value}
                    onChange={value => this.setState({value})}
                    minValue={1}
                    totalWidth={240}
                    totalHeight={50}
                    iconSize={25}
                    step={1}
                    valueType='real'
                    rounded
                    textColor='#B0228C'
                    iconStyle={{ color: 'white' }}
                    rightButtonBackgroundColor='#EA3788'
                    leftButtonBackgroundColor='#E56B70' />


                {/*<TextInput
            style={{ 
                 height: 40,
                 width: screen.width - 140,
                 borderBottomColor: 'gray',
                 marginLeft: 30,
                 marginRight: 30,
                 marginTop: 20,
                 marginBottom: 10,
                 borderBottomWidth: 1
             }}
            placeholder="Enter Quantity"/>*/}

                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    // marginTop: 20
                }}>Total Quantity : {this.state.data.quantity * this.state.value} {this.state.data.factor}</Text>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    // marginTop: 20
                }}>Total Price : ₹ {this.state.data.price * this.state.value} </Text>


                <Button style={{
                    fontSize: 18, color: 'white'
                }} title="Add To Cart"
                    icon={
                        <Feather
                            name="shopping-cart"
                            size={24}
                            color="white"
                        />} iconRight
                        
                    buttonStyle={{
                        marginTop: 15,
                        padding: 8,
                        marginLeft: 80,
                        marginRight: 80,
                        width: screen.width - 140,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen',
                        alignItems: 'center',

                    }}
                    onPress={() => {
                        const kimo = {
                            atitle: this.state.data.name,
                            item_price: this.state.data.price,
                            image: this.state.data.image,
                            factor: this.state.data.factor,
                            item_quantity: this.state.data.quantity,
                            quantity: this.state.data.quantity * this.state.value,
                            price: this.state.data.price * this.state.value,
                        }
                        this.setState({
                            isButtonPressed:true,})
                        console.warn(kimo)
                        { this.state.data.funct(kimo) }
                    }} />
            </Modal>

        );
    }
}



export default AddModal;