import React, { Component } from 'react';
import { Image, TouchableOpacity, Dimensions, Text} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import { MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";



export default class EventCard extends Component {

  renderBookingState = (state) => {
    if (state == "ATTESA") {
      return (
          <FontAwesome name="question-circle" size={35} color="#f1c40f"/>
      );
    }
    else if (state == "ACCETTATA") {
      return (
          <FontAwesome name="check-circle" size={35} color="#2ecc71"/>
      );
    }
    else if (state == "RIFIUTATA") {
      return (
          <FontAwesome name="times-circle" size={35} color="#e74c3c"/>
      );
    }
  }

  render() {
    
    return (
      <TouchableOpacity onPress={this.props.onEventPress}>
      <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 25}}>
       
        {/* IMMAGINE UTENTE - EVENTO - AGENZIA - PREZZO */}
        <CardItem style={{borderRadius: 25}}>

          <Left style={{flex:0.8}}>
            <TouchableOpacity onPress={this.props.onManagerPress}>
            <Thumbnail source={{uri: this.props.data.immagineAgenzia}} /> 
            </TouchableOpacity>
            <Body>
              <Text style={{fontSize: 20}}>{this.props.data.nomeEvento}</Text>
              <TouchableOpacity onPress={this.props.onManagerPress}>
                <Text note style={{color: 'gray'}}>{this.props.data.agenzia}</Text>
              </TouchableOpacity>
            </Body>
          </Left>

          <Right style={{flex:0.2}}>
            <Text>{this.props.data.prezzo}</Text>
          </Right>

        </CardItem>
      
        {/* IMMAGINE EVENTO */}
        <CardItem cardBody >

          <Image  style={{borderRadius: 5, marginLeft: 5, marginRight: 5, height: 200, width: null, flex: 1}}
                  source={{uri: this.props.data.immagineEvento}} //DA MODIFICARE CON PROP
           />

        </CardItem>

        {/* LOCALITA' - DESCRIZIONE - FAVORITE */}
        <CardItem content style={{borderRadius: 25}}>
  
          <Left style={{flex:0.8, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text style={{fontStyle: 'italic'}}>{this.props.data.citta}</Text>
            <Text>{this.props.data.descrizioneBreve}</Text>
          </Left>

          <Right style={{flex:0.2}}>
            {this.renderBookingState(this.props.data.stato)}
          </Right>

        </CardItem>
      </Card>
      </TouchableOpacity>
    )
  }
}

