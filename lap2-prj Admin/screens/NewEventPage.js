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


export default class NewEventPage extends React.Component {
  componentWillMount(){
    console.log()
  }

 

  render() {
    return (
      <Container style={{ backgroundColor : BACKGROUND_COLOR}}>
        <ScrollView>
          <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10}}>
          
              {/* IMMAGINE EVENTO */}
              <CardItem cardBody style={{borderRadius: 10}}>
                {/* <Image  style={{ borderRadius:10, height: 200, width: null, flex: 1}}
                        source={{uri: this.props.navigation.state.params.eventInfo.immagineEvento}}
                /> */}
              </CardItem>

              {/* LOCALITA' E ID_EVENTO*/}
              <CardItem >
                <Left style={{flex:0.8, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={{fontSize:10, fontStyle: 'italic'}}>{}, {}</Text>
                </Left>
                <Right>
                <Text style={{fontSize:10, fontStyle: 'italic'}}>Codice di riferimento: {}</Text>
                </Right>
              </CardItem>

              <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
              <Text style={{fontSize: 24, textAlign: 'center'}}>{}</Text>
              </CardItem>

              {/* DATA CALENDARIO */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/calendar.png')}/>
                    <Text >{}</Text>
                </Left>
              </CardItem>
              
              {/* ORARIO/I */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{ }}>
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/clock.png')}/>
                    <Text >{}</Text>
                </Left>
              </CardItem>

              {/* TEMPO E DIFFICOLTA'*/}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/stopwatch.png')}/>
                    <Text >{}</Text>
                </Left>

                <Left style={{}}>
                    <FontAwesome name='level-up' size={20}/>
                    <Text style={{marginLeft: 10}}>{}</Text>
                </Left>
              </CardItem>

              {/* PREZZO */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:20, height: 20, marginRight:10}} source={require('../assets/money.png')}/>
                    <Text >{}</Text>
                </Left>
              </CardItem>

              {/* DESCRIZIONE */}
              <CardItem  style={{borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 5, borderRadius: 10}} >
                <Left style={{}}>
                    <Image style={{width:23, height: 23, marginRight:10}} source={require('../assets/description.png')}/>
                    <Text style={{paddingRight: 20}}>{}</Text>
                </Left>
              </CardItem>

              {/* AGENZIA E EMAIL */}
              {/* <CardItem  style={{flexDirection: 'column', flexWrap: 'wrap',borderColor: BACKGROUND_COLOR, borderWidth: 1, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}} >
                <Body style={{flexDirection: 'row', margin: 5}}>
                <SimpleLineIcons name='user' size={16}/>
                <Text style={{marginLeft: 10}}>{}</Text>
                </Body>

                <Body style={{flexDirection: 'row', margin: 5}}>
                   <MaterialCommunityIcons name='email-outline' size={16}/>
                   <Text style={{marginLeft: 10}}>{}</Text>
               </Body>

               <Body style={{flexDirection: 'row', margin: 5}}>
                   <Feather name='phone' size={16}/>
                   <Text style={{marginLeft: 10}}>{}</Text>
               </Body>

               <Body style={{flexDirection: 'row', margin: 5}}>
                    <MaterialCommunityIcons name='facebook' size={16}/>
                    <Text style={{marginLeft: 10}}>{}</Text>
               </Body>
              </CardItem> */}
            </Card>
        </ScrollView>
    </Container>
    );
  }   
}

NewEventPage.navigationOptions = ({ navigation }) => {
  return {
    title: "Nuovo evento",
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
