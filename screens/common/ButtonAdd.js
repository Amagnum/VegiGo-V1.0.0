import { Card, CardItem, Thumbnail, Text, Button, Icon, Body } from 'native-base';
import React from 'react';

export default class ButtonAdd extends React.Component {
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <Card style={{padding:0 , margin: 0}}>
            <CardItem>
            <Thumbnail large square source={{uri: this.props.image}} />             
            <Body style={{ paddingHorizontal:8 }}>
                <Text style={{ fontSize:18 ,textAlign:'left'}} > {this.props.title} {"\n"}
                <Text note> {this.props.base} </Text>
                <Text  style={{ fontSize:18, color:'#ff2929'}} > {"\n"} {this.props.price}</Text>
                </Text>
            </Body>
            <Button rounded info textStyle={{color: '#87838B'}}>
                <Icon name="add" />
            </Button>
            </CardItem>
            </Card>
       );
    }
  }
  
  