import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image
} from "react-native";
import { Content, Card, CardItem, Thumbnail, Left, Body, Right, Container } from 'native-base';


import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { FontAwesome , Feather, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import { SearchBar, Button } from "react-native-elements";

import EventCard from "../components/EventCard";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";


export default class EventPage extends React.Component {

  render() {
    return (
      <Container style={{ backgroundColor : BACKGROUND_COLOR}}>
        <ScrollView>
          <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10}}>
          
              {/* IMMAGINE EVENTO */}
              <CardItem cardBody style={{borderRadius: 10}}>
                <Image  style={{ borderRadius:10, height: 200, width: null, flex: 1}}
                        source={{uri: this.props.navigation.state.params.eventInfo.immagineEvento}}
                />
              </CardItem>

              {/* LOCALITA' E ID_EVENTO*/}
              <CardItem >
                <Left style={{flex:0.8, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={{fontSize:10, fontStyle: 'italic'}}>{this.props.navigation.state.params.eventInfo.citta}, {this.props.navigation.state.params.eventInfo.provincia}</Text>
                </Left>
                <Right>
                <Text style={{fontSize:10, fontStyle: 'italic'}}>Codice di riferimento: {this.props.navigation.state.params.eventInfo.IDevento}</Text>
                </Right>
              </CardItem>

              <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
              <Text style={{fontSize: 24, textAlign: 'center'}}>{this.props.navigation.state.params.eventInfo.nomeEvento}</Text>
              </CardItem>

              {/* BOTTONE PRENOTA ORA */}
              <CardItem >
                  <View style={styles.buttonContainer}>
                      <TouchableOpacity
                          style={styles.searchButton}
                          activeOpacity={0.5}
                          onPress={() => this.props.navigation.navigate("ReservationPage",
                                                                         {eventInfo: this.props.navigation.state.params.eventInfo})}
                          title="Prenota"
                      >
                        <Text style={{textAlign:'center', color: "white" }}> Prenota adesso </Text>
                      </TouchableOpacity>
                  </View>
              </CardItem>

              {/* DATA CALENDARIO */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/calendar.png')}/>
                    <Text >{this.props.navigation.state.params.eventInfo.data}</Text>
                </Left>
              </CardItem>
              
              {/* ORARIO/I */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{ }}>
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/clock.png')}/>
                    <Text >{this.props.navigation.state.params.eventInfo.orario}</Text>
                </Left>
              </CardItem>

              {/* TEMPO E DIFFICOLTA'*/}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/stopwatch.png')}/>
                    <Text >{this.props.navigation.state.params.eventInfo.durata}</Text>
                </Left>

                <Left style={{}}>
                    <FontAwesome name='level-up' size={20}/>
                    <Text style={{marginLeft: 10}}>{this.props.navigation.state.params.eventInfo.difficolta}</Text>
                </Left>
              </CardItem>

              {/* PREZZO */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/money.png')}/>
                    <Text >{this.props.navigation.state.params.eventInfo.prezzo}</Text>
                </Left>
              </CardItem>

              {/* DESCRIZIONE */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:23, height: 23, marginRight:10}} source={require('../assets/description.png')}/>
                    <Text style={{paddingRight: 20}}>{this.props.navigation.state.params.eventInfo.descrizioneCompleta}</Text>
                </Left>
              </CardItem>

              {/* AGENZIA E EMAIL */}
              <CardItem  style={{flexDirection: 'column', flexWrap: 'wrap',borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}} >
                <Body style={{flexDirection: 'row', margin: 5}}>
                <SimpleLineIcons name='user' size={16}/>
                <Text style={{marginLeft: 10}}>{this.props.navigation.state.params.eventInfo.agenzia}</Text>
                </Body>

                <Body style={{flexDirection: 'row', margin: 5}}>
                   <MaterialCommunityIcons name='email-outline' size={16}/>
                   <Text style={{marginLeft: 10}}>{this.props.navigation.state.params.eventInfo.email}</Text>
               </Body>

               <Body style={{flexDirection: 'row', margin: 5}}>
                   <Feather name='phone' size={16}/>
                   <Text style={{marginLeft: 10}}>{this.props.navigation.state.params.eventInfo.numero}</Text>
               </Body>

               <Body style={{flexDirection: 'row', margin: 5}}>
                    <MaterialCommunityIcons name='facebook' size={16}/>
                    <Text style={{marginLeft: 10}}>{this.props.navigation.state.params.eventInfo.facebook}</Text>
               </Body>
              </CardItem>
            </Card>
        </ScrollView>
    </Container>
    );
  }   
}

EventPage.navigationOptions = ({ navigation }) => {
  return {
    title: "EventPage",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
    },
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center"
  },

  searchButton: {
    marginLeft: '10%',
    marginRight: '10%',
    padding: 10,
    backgroundColor: TINT_COLOR,
    borderRadius: 30,
  },
});
