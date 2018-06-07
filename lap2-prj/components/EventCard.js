import React, { Component } from 'react';
import { Image, TouchableOpacity, Dimensions, Text} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import { MaterialIcons, Feather } from "@expo/vector-icons";



export default class EventCard extends Component {
  render() {
    return (
      <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 25}}>
       
        {/* IMMAGINE UTENTE - EVENTO - AGENZIA - PREZZO */}
        <CardItem style={{borderRadius: 25}}>

          <Left style={{flex:0.8}}>
            <Thumbnail source= {require("../assets/userEvent.png")} />
            <Body>
              <Text style={{fontSize: 20,}}>{this.props.data.nomeEvento}</Text>
              <Text note style={{color: 'gray'}}>{this.props.data.agenzia}</Text>
            </Body>
          </Left>

          <Right style={{flex:0.2}}>
            <Text>{this.props.data.prezzo}</Text>
          </Right>

        </CardItem>
      
        {/* IMMAGINE EVENTO */}
        <CardItem cardBody >

          <Image  style={{borderRadius: 5, marginLeft: 5, marginRight: 5, height: 200, width: null, flex: 1}}
                  source={require("../assets/image.png")} //DA MODIFICARE CON PROP
           />

        </CardItem>

        {/* LOCALITA' - DESCRIZIONE - FAVORITE */}
        <CardItem content style={{borderRadius: 25}}>

          <Left style={{flex:0.8, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text style={{fontStyle: 'italic'}}>{this.props.data.localitaEvento}</Text>
            <Text>{this.props.data.descrizione}</Text>
          </Left>

          <Right style={{flex:0.2}}>
            <TouchableOpacity onPress={this.props.onFavorite}>
                   {this.props.data.favorite ? (
                     <Feather name="heart" size={25} color="red"/>) : (
                     <Feather name="heart" size={25} color="black"/>)}
            </TouchableOpacity>
          </Right>

        </CardItem>
      </Card>
    )
  }
}

