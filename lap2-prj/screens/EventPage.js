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
import { FontAwesome , Feather} from "@expo/vector-icons";
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
      <Card style={{ marginLeft: 10, marginRight: 10, borderRadius: 10}}>
       
      {/* IMMAGINE UTENTE - EVENTO - AGENZIA - PREZZO */}
      
    
      {/* IMMAGINE EVENTO */}
      <CardItem cardBody style={{borderRadius: 10}}>

        <Image  style={{ borderRadius:10, height: 200, width: null, flex: 1}}
                source={{uri: "http://www.benetural.com/incubatore/wp-content/uploads/2017/09/Programma-non-evento.jpg"}}
         />

      </CardItem>

      {/* LOCALITA' - DESCRIZIONE - FAVORITE */}
      <CardItem >
        <Left style={{flex:0.8, flexDirection: 'column', alignItems: 'flex-start' }}>
         <Text style={{fontSize:10, fontStyle: 'italic'}}>Etna, Rifugio Sapienza la torre</Text>
        </Left>

        <Right>
         <Text style={{fontSize:10, fontStyle: 'italic'}}>Codice di riferimento: 123456</Text>
        </Right>
      </CardItem>

      <CardItem style={{flexDirection: 'column', alignItems: 'center' }} >
      <Text style={{fontSize: 24, textAlign: 'center'}}>Passeggiata nel bosco</Text>
      </CardItem>

      <CardItem >
        
           <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.searchButton}
                activeOpacity={0.5}
                //onPress={() => this._goToResult(this.state.text)}
                title="Prenota"
              >
                <Text style={{textAlign:'center', color: "white" }}> Prenota adesso </Text>
              </TouchableOpacity>
          </View>
      
       </CardItem>

        
       
        {/* <Right>
          <Text style={{fontStyle: 'italic'}}>22/05/18</Text>
          <Text style={{fontStyle: 'italic'}}>Orari</Text>
          <Text style={{fontStyle: 'italic'}}>10,</Text>
        </Right> */}

        

      
    </Card>
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
    headerRight: (
      <TouchableOpacity>
        <FontAwesome
          style={{ paddingHorizontal: 15 }}
          name="user-circle"
          size={34}
          color={TINT_COLOR}
        />
    </TouchableOpacity>
    )
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
