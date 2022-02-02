import React from "react";
import * as firebase from 'firebase';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    AsyncStorage
} from "react-native";
import { Item } from "native-base";


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
            this.state = {
                mobile: '',
                intiOrder: [],

            }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Order History",
            headerRight: (<View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-around',
            }}>
            </View>

            )
        };
    };

    _retrieveData = async () => {
        try {
            const mobile = await AsyncStorage.getItem('mobile');
            this.setState({ mobile },
            )
            console.warn(mobile)
        } catch (error) {
            console.warn(error)
        }
    };

    componentDidMount() {
        this._retrieveData()
        firebase.database().ref().child('vegigo_orders_live/'+this.state.mobile+'/').once('value', snapshot => {
            const data = snapshot.child(this.state.mobile).val()
            
            if (data) {
                let intiOrder = [];
                Object.keys(data).forEach(order => intiOrder=[data[order], ...intiOrder]);
                
                this.setState({intiOrder},
                    ()=>{
                    console.warn(this.state.intiOrder)
                })
            }
        });

   }



    render() {
        return (
            <ScrollView>
                <View style={styles.listItem}>
                    <FlatList
                        data={this.state.intiOrder}
                        keyExtractor={item => item.orderNumber}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                <Text style={{ fontSize: 15, backgroundColor: '#555555', color: '#fff', padding: 8 }}> Order : {item.orderNumber} {' '}--- <Text style={{ fontSize: 15, backgroundColor: '#fff', color: '#555555', padding: 8 }}> Code : {item.code} </Text> </Text> 
                                <Text style={{ fontSize: 15, backgroundColor: '#ffffff', color: '#ee5555', padding: 4 }}> ₹ {item.totalPrice} ({item.totalItems} items) </Text>
                                <Text style={{ fontSize: 15, backgroundColor: '#ffffff', color: '#558855', padding: 1 }}> Status : {item.status} </Text>
                                <FlatList
                                    data={item.orders}
                                    keyExtractor={(items,index)=>index.toString()}
                                    renderItem={({item})=>(
                                        <View style={styles.container}>
                                            <Text>{item}</Text>
                                        </View>
                                    )}
                                />
                                <Text style={{ fontSize: 15, backgroundColor: '#888888', color: '#cccc00', padding: 1 }}>{item.timestamp}</Text>
                            </View>
                        )}
                    />
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
        borderWidth:2,
        borderRadius: 5
    },
    listItem: {
        fontSize: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5

    },
    priceAndItems: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignContent: 'space-between',
        backgroundColor: '#888888',

    }
});

